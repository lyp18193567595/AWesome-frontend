


// @ts-ignore
import React from 'react';
import { Card, Space, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
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

const EquipCard: React.FC = () => {
    const navigate = useNavigate();

    const handleTaskClick = () => {
        navigate('/task-center');
    };

    return (
        <Card
            hoverable
            style={{ width: 340 }}
            cover={
                <img
                    alt="example"
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
                    <Button size="small">无人机01</Button>
                    <Button size="small" onClick={handleTaskClick}>
                        <img src={intask} width={14} style={{ marginRight: 4 }} />
                        任务中
                    </Button>
                    <Button size="small" style={{ marginRight: '20px' }}>
                        <img src={online} width={14} style={{ marginRight: 4 }} />
                        在线
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
                <img src={number} width={40} style={{ marginRight: 4, marginLeft: '5px' }} />
                <img src={blueTeeth} width={20} style={{ marginRight: 4, marginLeft: '10px' }} />
                <Button type="primary" style={{ marginLeft: '20px' }}>删除设备</Button>
            </div>
        </Card>
    );
};

export default EquipCard;