/**
 * 模型卡片
 */
// @ts-ignore
import React from 'react';
import {Button, Card, Tag} from 'antd';

const { Meta } = Card;
// @ts-ignore
import ModelImage from '../assets/model.png'
import Title from "antd/es/skeleton/Title";

const ModelCard: React.FC = () => (

    <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={ModelImage} />}
    >
        <Meta title="巡检专家" style={{marginBottom :'20px'}}></Meta>
        <Meta title="模型描述" style={{marginBottom :'20px'}} ></Meta>
        <Tag>标签</Tag>
        <Tag>标签</Tag> <Tag>标签</Tag>

        <Button type="primary" block style={{marginTop :'50px'}}>
            使用
        </Button>
    </Card>
);

export default ModelCard;