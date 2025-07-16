// @ts-ignore
import React from 'react';
import { Button, ConfigProvider, Input } from 'antd';
import { ArrowUpOutlined } from "@ant-design/icons";

const DoChatPage: React.FC = () => {
    const handleSend = () => {
        console.log('发送');
    };
    return (
        <div className="DoChatPage" style={{ position: 'relative', width: '1500px',marginTop :'700px',marginLeft :'50px'}}>
            <Input.TextArea
                rows={2}
                placeholder="请输入你的问题..."
                style={{
                    paddingRight: '50px',
                    borderRadius: '20px',
                    height: '80px',
                    width: '100%',
                }}
            />
            <Button
                type="primary"
                icon={<ArrowUpOutlined />}
                onClick={handleSend}
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
    );
};

export default DoChatPage;