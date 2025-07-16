/**
 * 模型中心
 */
// @ts-ignore
import React from 'react';
import {Button, Col, Row} from "antd";
import Search from "antd/es/input/Search";
// @ts-ignore
import filterIcon from './assets/expand.png'
import ModelCard from "./components/ModelCard";
const ModelCenter = () => {
    return (
        <div className="ModelCenter">
            <div className="select">
                <Button  style={{
                    width: 150,
                    height: 30,
                    borderRadius: 20,
                    fontSize: 16,
                    marginRight :'20px'

                }}
                >
                    <img
                        src={filterIcon}
                        alt="filter"
                        style={{
                            width: '16px',
                            height: '16px',
                            marginRight: '8px'
                        }}
                    />

                    展开筛选器</Button>
                <Search placeholder="输入搜索关键词"  style={{ width: 400, paddingBottom: '20px' }} />
            </div>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '4px 12px',
                justifyContent: 'space-between',
                paddingLeft :'70px',
                paddingTop :'10px',
                rowGap:'20px'
            }}>
                <div style={{ width: 'calc(25% - 12px)' }}><ModelCard /></div>
                <div style={{ width: 'calc(25% - 12px)' }}><ModelCard /></div>
                <div style={{ width: 'calc(25% - 12px)' }}><ModelCard /></div>
                <div style={{ width: 'calc(25% - 12px)' }}><ModelCard /></div>
                <div style={{ width: 'calc(25% - 12px)' }}><ModelCard /></div>
                <div style={{ width: 'calc(25% - 12px)' }}><ModelCard /></div>
                <div style={{ width: 'calc(25% - 12px)' }}><ModelCard /></div>
                <div style={{ width: 'calc(25% - 12px)' }}><ModelCard /></div>
            </div>

        </div>
    );
};
// @ts-ignore
export default ModelCenter;