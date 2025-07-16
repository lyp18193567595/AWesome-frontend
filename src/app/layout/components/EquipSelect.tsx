/**
 * 设备卡片
 */
// @ts-ignore
import React from 'react';
import { Card, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
// @ts-ignore
import equipImage from '../assets/equip.png'
import {useNavigate} from "react-router-dom";

const { Meta } = Card;

const EquipSelect: React.FC = () => {

    const navigate = useNavigate();
    const handlePrev = () => console.log('切换到上一张');
    const handleNext = () => console.log('切换到下一张');
    const handleAddDevice = () => {
        navigate('/add-equip');
    };
    return (
        <Card
            hoverable
            style={{ width: 280, position: 'relative' }} // 相对定位，方便箭头定位
            cover={
                <div style={{ position: 'relative' }}>
                    <img
                        alt="设备图片"
                        src={equipImage}
                        style={{
                            height: 120, // 减小图片高度
                            width: '100%',
                            objectFit: 'cover',
                        }}
                    />
                    {/* 左右切换箭头 */}
                    <Button
                        type="text"
                        icon={<LeftOutlined />}
                        onClick={handlePrev}
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 1,
                        }}
                    />
                    <Button
                        type="text"
                        icon={<RightOutlined />}
                        onClick={handleNext}
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 1,
                        }}
                    />
                </div>
            }
            title={<div style={{ fontWeight: 'bold' }}>设备卡</div>}
            extra={<Button size="small"  onClick={handleAddDevice} >添加</Button>}
        >
            <Meta title="巡检专家" description="一句话介绍模型的应用场景和功能" />
        </Card>
    );
};

export default EquipSelect;