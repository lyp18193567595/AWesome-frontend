/**
 * 系统首页
 */

// @ts-ignore
import {Button, Card, Col, Input, Modal, Row, Space} from 'antd';
// @ts-ignore
import React, {useEffect, useState} from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';
import EquipSelect from "./components/EquipSelect";
import ModelSelect from "./components/ModelSelect";
import { useNavigate } from 'react-router-dom';
const Layout = () => {
    const navigate = useNavigate();

    const handleSend = () => {
        navigate('/dochat'); // 跳转到 dochat 页面
        console.log('123')
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // @ts-ignore
    return <div>
        <div className="Layout">
            <div className="Layout-header">
                <h1>快速开始</h1>
                <p>选择你的模型和设备</p>
                <Row gutter={16} style={{paddingLeft :'200px',paddingBottom :'30px',paddingTop :'20px'}}> {/* gutter 控制间距 */}
                    <Col span={12}> {/* 每列占 50% 宽度 */}
                        <EquipSelect />
                    </Col>
                    <Col span={12}>
                        <ModelSelect />
                    </Col>
                </Row>
            </div>
            <div className="Layout-content" style={{paddingBottom:'30px'}}>
                <Button  style={{
                    width: 150,
                    height: 40,
                    borderRadius: 20,
                    fontSize: 16,
                    fontWeight: 'bold',
                }}  onClick={showModal}>一键部署</Button>
                <Modal
                    title="一键部署"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <p>详情</p>
                    <p>详情</p>
                    <p>详情</p>
                </Modal>
            </div>
            <div className="Layout-title" style={{fontSize :'46px',marginLeft :'-950px',fontWeight :'bold'}}>你好，有什么指示？</div>
            <div className="Layout-footer" style={{
                padding: '16px',

                position: 'relative',

            }}>
                <Input.TextArea
                    rows={2}
                    placeholder="给我布置一个任务（可以让我召回、巡检、物资投送...）"
                    style={{
                        paddingRight: '50px',
                        borderRadius: '20px',
                        height:'260px',
                        width:'1500px',
                    }}
                />
                <Button
                    type="primary"
                    icon={<ArrowUpOutlined />}
                    onClick={handleSend}
                    style={{
                        position: 'absolute',
                        right: '24px',
                        bottom: '24px',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px'
                    }}
                />
            </div>
        </div>
    </div>;
};

export default Layout;