/**
 * 模型卡片
 */
// @ts-ignore
import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;
// @ts-ignore
import ModelImage from '../assets/ModelImage.png'
const ModelCard: React.FC = () => (
    <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src={ModelImage} />}
>
</Card>

);

export default ModelCard;