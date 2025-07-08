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
import equipCard from "./components/equipCard";
import {Outlet} from "react-router-dom";
type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;
const options = [
    { value: 'option1', label: '选项1' },
    { value: 'option2', label: '选项2' },
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
                <Select
                    defaultValue="option1"
                    style={{ width: 200,marginRight :'20px'}}
                    options={options}
                />
                <Select
                    defaultValue="option1"
                    style={{ width: 200,marginRight :'20px' }}
                    options={options}
                />
                <Select
                defaultValue="option1"
                style={{ width: 200,marginRight :'20px' }}
                options={options}
            />
                <Select
                defaultValue="option1"
                style={{ width: 200 }}
                options={options}
            />
            </div>
            <div className="content">

                <equipCard />







            </div>
        </div>
    );
};

// @ts-ignore
export default EquipmentCenter;