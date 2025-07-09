/**
 * 设备中心页面
 *//**
 *系统首页
 */
// @ts-ignore
import React, {useState} from 'react';
import {Button, Input, Space, Image,Modal,Select} from 'antd';
import type { GetProps } from 'antd';
// @ts-ignore
import cardImage from '../../assets/card2.png'
// @ts-ignore
import localImage from '../../assets/list1.png'
import EquipCard from "./components/EquipCard";
import {Outlet} from "react-router-dom";
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
    return (
        <div>
            <div className="header">
                <Search placeholder="输入搜索关键词" onSearch={onSearch} style={{ width: 400,paddingBottom:'20px' }} />
                <Image
                    width={28}
                    src={cardImage}
                    style={{ paddingLeft:'5px'}}
                />
                <Image
                    width={28}
                    src={localImage}
                    style={{ paddingLeft:'5px',paddingRight :'5px'}}
                />

                <Button type="primary" style={{paddingLeft:'10px'}} onClick={showModal}>添加新设备</Button>
                <Modal
                    title="Basic Modal"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                />

            </div>
            <div className="header" style={{paddingBottom :'50px'}}>

               任务状态
                <Select
                    defaultValue="1"
                    style={{ width: 200,marginRight :'20px',paddingLeft :'20px'}}
                    options={taskState}
                />
                连接状态
                <Select
                    defaultValue="1"
                    style={{ width: 200,marginRight :'20px',paddingLeft :'20px' }}
                    options={ConnectionStatus}
                />
                电量
                <Select
                    defaultValue="1"
                    style={{ width: 200,marginRight :'20px',paddingLeft :'20px'  }}
                    options={electricityQuantity}
                />
                型号
                <Select
                    defaultValue="1"
                    style={{ width: 200,marginRight :'20px',paddingLeft :'20px'  }}
                    options={model}
                />

            </div>
            <div className="content" >


                <EquipCard />




            </div>
        </div>
    );
};

// @ts-ignore
export default EquipmentCenter;