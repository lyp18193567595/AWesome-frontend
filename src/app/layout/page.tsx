/**
 * 系统首页
 */

// @ts-ignore
import {Button, Card, Col, Row, Space} from 'antd';
// @ts-ignore
import React, {useEffect} from 'react';
import EquipSelect from "./components/EquipSelect";
import ModelSelect from "./components/ModelSelect";

const Layout = () => {

    // @ts-ignore
    return <div>
        <div className="Layout">
            <div className="Layout-header">
                <h1>快速开始</h1>
                <p>选择你的模型和设备</p>
                <Row gutter={16}> {/* gutter 控制间距 */}
                    <Col span={12}> {/* 每列占 50% 宽度 */}
                        <EquipSelect />
                    </Col>
                    <Col span={12}>
                        <ModelSelect />
                    </Col>
                </Row>
            </div>
            <div className="Layout-content">
                <Button>一键部署</Button>
            </div>
            <div className="Layout-footer">
                对话框
            </div>
        </div>
    </div>;
};

export default Layout;