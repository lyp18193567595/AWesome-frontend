//
//
//
// // @ts-ignore
// import React, {useState} from 'react';
// import {Card, Space, Button, Modal} from 'antd';
// import { useNavigate } from 'react-router-dom';
// // @ts-ignore
// import online from '../../../assets/online.png';
// // @ts-ignore
// import recall from '../../../assets/recall.png';
// // @ts-ignore
// import synchronous from '../../../assets/synchronous.png';
// // @ts-ignore
// import intask from '../../../assets/intask.png';
// // @ts-ignore
// import UAV from '../assets/UAV.png';
// // @ts-ignore
// import electricity from '../assets/electricity.png';
// // @ts-ignore
// import number from '../assets/number.png';
// // @ts-ignore
// import blueTeeth from '../assets/blueTeeth.png';
//
// const { Meta } = Card;
//
// const EquipCard: React.FC = () => {
//     const navigate = useNavigate();
//
//     const handleTaskClick = () => {
//         navigate('/task-center');
//     };
//     const [isModalVisible,setIsModalVisible] = useState(false)
//     const showModal = ()=> {
//         setIsModalVisible(true);
//     };
//     const handleOk = () => {
//         console.log('设备已删除');
//         setIsModalVisible(false);
//     }
//     const handleCancel = () => {
//         setIsModalVisible(false);
//     }
//
//     return (
//         <Card
//             hoverable
//             style={{ width: 340 }}
//             cover={
//                 <img
//                     alt="example"
//                     src={UAV}
//                     style={{
//                         width: '250px',
//                         height: '200px',
//                         display: 'block',
//                         margin: '0 auto',
//                     }}
//                 />
//             }
//             extra={
//                 <Space>
//                     <Button size="small">无人机01</Button>
//                     <Button size="small" onClick={handleTaskClick}>
//                         <img src={intask} width={14} style={{ marginRight: 4 }} />
//                         任务中
//                     </Button>
//                     <Button size="small" style={{ marginRight: '20px' }}>
//                         <img src={online} width={14} style={{ marginRight: 4 }} />
//                         在线
//                     </Button>
//                 </Space>
//             }
//         >
//             <Button size="small" style={{ marginTop: 10, marginRight: '20px' }}>
//                 <img src={recall} width={14} style={{ marginRight: 4 }} />
//                 召回
//             </Button>
//             <Button size="small" style={{ marginTop: 10, marginRight: '20px' }}>
//                 <img src={synchronous} width={14} style={{ marginRight: 4 }} />
//                 同步
//             </Button>
//             <Button size="small" style={{ marginTop: 10 }}>
//                 巡检
//             </Button>
//             <div
//                 className="cardFooter"
//                 style={{
//                     marginTop: '20px',
//                     display: 'flex',
//                     alignItems: 'center'
//                 }}
//             >
//                 电量
//                 <img src={electricity} width={20} style={{ marginRight: 4, marginLeft: '10px' }} />
//                 <img src={number} width={40} style={{ marginRight: 4, marginLeft: '5px' }} />
//                 <img src={blueTeeth} width={20} style={{ marginRight: 4, marginLeft: '10px' }} />
//                 <Button type="primary" style={{ marginLeft: '20px' }} onClick={showModal}>删除设备</Button>
//                 <Modal title="提示"
//                        visible={isModalVisible}
//                        onOk = {handleOk}
//                        onCancel={handleCancel}
//                        okText="删除"
//                        cancelText="取消"
//
//                 >
//                     <p>确认删除该设备？</p>
//
//                 </Modal>
//
//             </div>
//         </Card>
//     );
// };
//
// export default EquipCard;
//


// @ts-ignore
import React, { useState, useEffect } from 'react';
import { Card, Space, Button, Modal, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @ts-ignore
import online from '../../../assets/online.png';
// @ts-ignore
import recall from '../../../assets/recall.png';
// @ts-ignore
import synchronous from '../../../assets/synchronous.png';
// @ts-ignore
import intask from '../../../assets/intask.png';
// @ts-ignore
import UAV from '../assets/UAV.png';
// @ts-ignore
import electricity from '../assets/electricity.png';
// @ts-ignore
import number from '../assets/number.png';
// @ts-ignore
import blueTeeth from '../assets/blueTeeth.png';

const { Meta } = Card;

interface Equipment {
    id: number;
    equip_name: string;
    task_status_display: string;
    connect_status_display: string;
    battery_level_display: string;
    skill_pack: string;
}

interface FilterProps {
    taskStatus: string;
    connectionStatus: string;
    batteryLevel: string;
}

const EquipCard: React.FC <{filters: FilterProps}> = ({filters}) => {
    const navigate = useNavigate();
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        // @ts-ignore
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/equipments/');
                setEquipments(response.data);
            } catch (error) {
                console.error('获取设备数据失败:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleTaskClick = () => {
        navigate('/task-center');
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        console.log('设备已删除');
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // 根据状态获取对应的图标
    const getStatusIcon = (status: string) => {
        switch(status) {
            case '任务中': return intask;
            case '在线': return online;
            default: return online;
        }
    };

    // 添加过滤逻辑
    const filteredEquipments = equipments.filter(equipment => {
        // 任务状态筛选
        const taskStatusMatch =
            filters.taskStatus === '1' ? equipment.task_status_display === '任务中' :
                filters.taskStatus === '2' ? equipment.task_status_display === '空闲' :
                    true;

        // 连接状态筛选
        const connectionStatusMatch =
            filters.connectionStatus === '1' ? equipment.connect_status_display === '在线' :
                filters.connectionStatus === '2' ? equipment.connect_status_display === '断线' :
                    true;

        // 电量筛选
        // @ts-ignore
        // @ts-ignore
        // @ts-ignore
        const batteryLevelMatch =
            filters.batteryLevel === '1' ? equipment.battery_level_display.includes('80~100%') :
                filters.batteryLevel === '2' ? equipment.battery_level_display.includes('50~80%') :
                    filters.batteryLevel === '3' ? equipment.battery_level_display.includes('0~50%') :
                        true;

        return taskStatusMatch && connectionStatusMatch && batteryLevelMatch;
    });

    return (
        <Space size={16} wrap>
            {filteredEquipments.map(equipment => (
                <Card
                    key={equipment.id}
                    hoverable
                    style={{ width: 340 }}
                    cover={
                        <img
                            alt="equipment"
                            src={UAV}
                            style={{
                                width: '250px',
                                height: '200px',
                                display: 'block',
                                margin: '0 auto',
                            }}
                        />
                    }
                    extra={
                        <Space>
                            <Button size="small">{equipment.equip_name}</Button>
                            <Button size="small" onClick={handleTaskClick}>
                                <img
                                    src={getStatusIcon(equipment.task_status_display)}
                                    width={14}
                                    style={{ marginRight: 4 }}
                                />
                                {equipment.task_status_display}
                            </Button>
                            <Button size="small" style={{ marginRight: '20px' }}>
                                <img
                                    src={getStatusIcon(equipment.connect_status_display)}
                                    width={14}
                                    style={{ marginRight: 4 }}
                                />
                                {equipment.connect_status_display}
                            </Button>
                        </Space>
                    }
                >
                    <Button size="small" style={{ marginTop: 10, marginRight: '20px' }}>
                        <img src={recall} width={14} style={{ marginRight: 4 }} />
                        召回
                    </Button>
                    <Button size="small" style={{ marginTop: 10, marginRight: '20px' }}>
                        <img src={synchronous} width={14} style={{ marginRight: 4 }} />
                        同步
                    </Button>
                    <Button size="small" style={{ marginTop: 10 }}>
                        巡检
                    </Button>
                    <div
                        className="cardFooter"
                        style={{
                            marginTop: '20px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        电量
                        <img src={electricity} width={20} style={{ marginRight: 4, marginLeft: '10px' }} />
                        <Tag color={getBatteryColor(equipment.battery_level_display)}>
                            {equipment.battery_level_display}
                        </Tag>
                        <img src={blueTeeth} width={20} style={{ marginRight: 4, marginLeft: '10px' }} />
                        <Button
                            type="primary"
                            style={{ marginLeft: '20px' }}
                            onClick={showModal}
                        >
                            删除设备
                        </Button>
                    </div>
                </Card>
            ))}

            <Modal
                title="提示"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="删除"
                cancelText="取消"
            >
                <p>确认删除该设备？</p>
            </Modal>
        </Space>
    );
};

// 根据电量显示不同颜色的Tag
const getBatteryColor = (level: string) => {
    // @ts-ignore
    if (level.includes('80~100%')) return 'green';
    // @ts-ignore
    if (level.includes('50~80%')) return 'orange';
    return 'red';
};

export default EquipCard;
