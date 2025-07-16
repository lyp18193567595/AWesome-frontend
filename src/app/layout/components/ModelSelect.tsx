

/**
 * 模型卡片
 */
// @ts-ignore
import React from 'react';
import { Card, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
// @ts-ignore
import modelImage from '../assets/model.png'

const { Meta } = Card;

const ModelSelect: React.FC = () => {
    // 切换图片的函数（示例）
    const handlePrev = () => console.log('切换到上一张');
    const handleNext = () => console.log('切换到下一张');

    return (
        <Card
            hoverable
            style={{ width: 280, position: 'relative' }} // 相对定位，方便箭头定位
            cover={
                <div style={{ position: 'relative' }}>
                    <img
                        alt="模型图片"
                        src={modelImage}

                        style={{
                            width: '60%',      // 宽度填满卡片
                            height: 'auto',     // 高度自动按比例调整
                            maxHeight: 120,     // 限制最大高度（可选）
                            display: 'block',   // 避免图片底部留白
                            marginLeft :'60px'
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
            title={<div style={{ fontWeight: 'bold' }}>模型卡</div>}

        >
            <Meta title="无人机" description="一句话介绍无人机" />
        </Card>
    );
};

export default ModelSelect;