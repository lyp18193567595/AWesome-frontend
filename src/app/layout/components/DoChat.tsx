/**
 * 聊天页面
 */

// @ts-ignore
import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import { ArrowUpOutlined } from "@ant-design/icons";

const DoChatPage: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [responses, setResponses] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    // 只保留中文、中文标点和基本换行空格
    const filterChineseOnly = (text: string): string => {
        // 中文 Unicode 范围：[\u4e00-\u9fa5]
        // 中文标点：\u3000-\u303f\uff00-\uffef
        // 保留：空格、换行、中文、中文标点
        return text.replace(/[^\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef\n\s]/g, '');
    };

    const extractTextContent = (data: any): string | null => {
        try {
            const jsonData = typeof data === 'string' ? JSON.parse(data) : data;
            const content = jsonData.content || jsonData.reasoning_content || null;
            return content ? filterChineseOnly(content) : null;
        } catch (e) {
            console.warn('解析JSON失败:', e);
            return null;
        }
    };

    // @ts-ignore
    const handleSend = async () => {
        if (!inputValue.trim()) {
            message.warning('请输入问题');
            return;
        }

        setLoading(true);
        setResponses([]);

        try {
            const res = await fetch('http://127.0.0.1:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: inputValue,
                    conversation_id: "123",
                    user_id: "react_user"
                })
            });

            if (!res.ok) throw new Error(`请求失败: ${res.status}`);

            const reader = res.body?.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';

            while (reader) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');

                buffer = lines.pop() || '';

                const newResponses = lines
                    .filter(line => line.trim())
                    .map(line => {
                        const content = extractTextContent(line);
                        return content || filterChineseOnly(line);
                    })
                    .filter(Boolean);

                if (newResponses.length > 0) {
                    setResponses(prev => [...prev, ...newResponses]);
                }
            }

            if (buffer.trim()) {
                const content = extractTextContent(buffer) || filterChineseOnly(buffer);
                setResponses(prev => [...prev, content]);
            }

        } catch (error) {
            message.error('请求出错，请重试');
            console.error('API调用错误:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px'
        }}>
            {/* 响应展示区域 */}
            <div style={{
                marginBottom: '20px',
                padding: '15px',
                border: '1px solid #d9d9d9',
                borderRadius: '8px',
                backgroundColor: '#fafafa',
                minHeight: '200px',
                maxHeight: '400px',
                overflowY: 'auto',
                whiteSpace: 'pre-wrap',
                fontSize: '16px',
                lineHeight: '1.6'
            }}>
                {responses.join('\n')}
            </div>

            <div style={{ position: 'relative' }}>
                <Input.TextArea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    rows={4}
                    placeholder="请输入你的问题..."
                    style={{
                        paddingRight: '50px',
                        borderRadius: '20px',
                        width: '100%',
                    }}
                    onPressEnter={(e) => {
                        if (!e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />

                <Button
                    type="primary"
                    icon={<ArrowUpOutlined />}
                    onClick={handleSend}
                    loading={loading}
                    style={{
                        position: 'absolute',
                        right: '10px',
                        bottom: '10px',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                    }}
                />
            </div>
        </div>
    );
};

export default DoChatPage;