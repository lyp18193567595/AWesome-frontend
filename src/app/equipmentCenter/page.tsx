
/**
 * 设备中心页面
 */
// @ts-ignore
import React, { useState } from 'react';
import { Button, Input, Space, Image, Modal, Select } from 'antd';
import type { GetProps } from 'antd';
// @ts-ignore
import cardImage from '../../assets/card2.png';
// @ts-ignore
import localImage from '../../assets/list1.png';
import EquipCard from "./components/EquipCard";
import EquipList from "./components/EquipList";
import { Outlet } from "react-router-dom";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const taskState = [
    { value: '1', label: '任务中' },
    { value: '2', label: '空闲' },
];

const ConnectionStatus = [
    { value: '1', label: '在线' },
    { value: '2', label: '断线' },
];

const electricityQuantity = [
    { value: '1', label: '80-100' },
    { value: '2', label: '50-80' },
    { value: '3', label: '0-50' }
];

const model = [
    { value: '1', label: '80-100' },
    { value: '2', label: '50-80' },
    { value: '3', label: '0-50' }
];

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const EquipmentCenter = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'card' | 'list'>('card'); // 新增状态控制显示模式

    const [filters, setFilters] = useState({
        taskStatus: '1',
        connectionStatus: '1',
        batteryLevel: '1',
    });
    // 处理筛选条件变化
    const handleFilterChange = (type: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [type]: value
        }));
    };


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // 切换视图模式
    const toggleViewMode = (mode: 'card' | 'list') => {
        setViewMode(mode);
    };

    return (
        <div>
            <div className="header">
                <Search placeholder="输入搜索关键词" onSearch={onSearch} style={{ width: 400, paddingBottom: '20px' }} />
                <Image
                    width={28}
                    src={cardImage}
                    style={{ paddingLeft: '5px', cursor: 'pointer',marginLeft :'8px'}}
                    onClick={() => toggleViewMode('card')}
                    preview={false}
                />
                <Image
                    width={28}
                    src={localImage}
                    style={{ paddingLeft: '5px', paddingRight: '5px', cursor: 'pointer',marginLeft :'10px'}}
                    onClick={() => toggleViewMode('list')}
                    preview={false}
                />

                <Button type="primary" style={{ paddingLeft: '20px',marginLeft :'30px'}} onClick={showModal}>添加新设备</Button>
                <Modal
                    title="Basic Modal"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                />
            </div>
            <div className="header" style={{ paddingBottom: '50px' }}>
                设备状态
                <Select
                    defaultValue="1"
                    style={{ width: 200, marginRight: '20px', paddingLeft: '20px' }}
                    options={taskState}  onChange={(value) => handleFilterChange('taskStatus', value)}
                />
                连接状态
                <Select
                    defaultValue="1"
                    style={{ width: 200, marginRight: '20px', paddingLeft: '20px' }}
                    options={ConnectionStatus}  onChange={(value) => handleFilterChange('connectionStatus', value)}
                />
                电量
                <Select
                    defaultValue="1"
                    style={{ width: 200, marginRight: '20px', paddingLeft: '20px' }}
                    options={electricityQuantity}  onChange={(value) => handleFilterChange('batteryLevel', value)}
                />
                型号
                <Select
                    defaultValue="1"
                    style={{ width: 200, marginRight: '20px', paddingLeft: '20px' }}
                    options={model}
                />
            </div>
            <div className="content">
                {viewMode === 'card' ? <EquipCard filters={filters}/> : <EquipList />}
            </div>
        </div>
    );
};

export default EquipmentCenter;