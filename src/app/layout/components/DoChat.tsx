/**
 * 聊天页面
 */

// @ts-ignore
import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, message } from 'antd';
import { ArrowUpOutlined } from "@ant-design/icons";

const DoChatPage: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 自动滚动到底部
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // @ts-ignore
    const handleSend = async () => {
        if (!inputValue.trim()) {
            message.warning('请输入问题');
            return;
        }

        setLoading(true);
        // 添加用户消息
        setMessages(prev => [...prev, { role: 'user', content: inputValue }]);
        setInputValue('');

        try {
            const res = await fetch('http://127.0.0.1:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: inputValue,
                    conversation_id: "123",
                    user_id: "react_user",
                    additional_messages: ''
                })
            });

            if (!res.ok) throw new Error(`请求失败: ${res.status}`);

            const reader = res.body?.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';
            let assistantMessage = { role: 'assistant', content: '' };

            while (reader) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');

                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (!line.trim()) continue;

                    try {
                        const data = JSON.parse(line);

                        // 处理不同类型的消息事件
                        if (data.event === 'conversation.message.delta') {
                            // 提取内容并拼接
                            if (data.data.content) {
                                assistantMessage.content += data.data.content;
                            }
                            if (data.data.reasoning_content) {
                                assistantMessage.content += data.data.reasoning_content;
                            }

                            // 更新消息，只保留最新的AI消息
                            setMessages(prev => {
                                const lastMsg = prev[prev.length - 1];
                                if (lastMsg?.role === 'assistant') {
                                    return [...prev.slice(0, -1), assistantMessage];
                                }
                                return [...prev, assistantMessage];
                            });
                        }
                    } catch (e) {
                        console.warn('解析JSON失败:', e);
                    }
                }
            }

            // 处理剩余内容
            if (buffer.trim()) {
                try {
                    const data = JSON.parse(buffer);
                    if (data.event === 'conversation.message.delta') {
                        if (data.data.content) {
                            assistantMessage.content += data.data.content;
                        }
                        if (data.data.reasoning_content) {
                            assistantMessage.content += data.data.reasoning_content;
                        }
                        setMessages(prev => [...prev, assistantMessage]);
                    }
                } catch (e) {
                    console.warn('解析剩余内容失败:', e);
                }
            }

        } catch (error) {
            message.error('请求出错，请重试');
            console.error('API调用错误:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: '服务暂时不可用，请稍后再试' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* 消息展示区域 */}
            <div style={{
                flex: 1,
                marginBottom: '20px',
                padding: '15px',
                border: '1px solid #d9d9d9',
                borderRadius: '8px',
                backgroundColor: '#fafafa',
                overflowY: 'auto',
            }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{
                        marginBottom: '12px',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        backgroundColor: msg.role === 'user' ? '#e6f7ff' : '#f6f6f6',
                        whiteSpace: 'pre-wrap',
                        lineHeight: '1.6'
                    }}>
                        <strong>{msg.role === 'user' ? '你' : '助手'}: </strong>
                        {msg.content}
                    </div>
                ))}
                {loading && <div style={{ padding: '8px 12px' }}>思考中...</div>}
                <div ref={messagesEndRef} />
            </div>

            {/* 输入区域 */}
            <div style={{ position: 'relative' }}>
                <Input.TextArea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    rows={4}
                    placeholder="请输入你的问题..."
                    style={{
                        paddingRight: '50px',
                        borderRadius: '20px',
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
