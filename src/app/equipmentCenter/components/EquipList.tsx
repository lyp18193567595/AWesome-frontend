
/**
 * 设备中心列表
 */
// @ts-ignore
import React, { useEffect, useState } from 'react';
import {Space, Table, Spin, Tag} from 'antd';
import type { TableProps } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

interface DataType {
    key: string;
    equipName: string;
    taskStatus: string;
    connectStatus: string;
    SkillPack: string[];
    quantityOfElectricity: string;
}

const EquipList: React.FC = () => {
    const navigate = useNavigate();
    const [tableData, setTableData] = useState<DataType[]>([]);
    const [loading, setLoading] = useState(true);

    // 获取后端数据
    useEffect(() => {
        // @ts-ignore
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/equipments/');
                console.log('API 返回数据:', response.data);

                // 转换数据格式
                const formattedData = response.data.map((item: any) => ({
                    key: item.id.toString(),
                    equipName: item.equip_name,
                    taskStatus: item.task_status_display,
                    connectStatus: item.connect_status_display,
                    SkillPack: item.skill_pack.split(',').map((s: string) => s.trim()),
                    quantityOfElectricity: item.battery_level_display
                }));

                setTableData(formattedData);
            } catch (error) {
                console.error('请求失败:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const jumpToModelCenter = () => {
        navigate('/skill-models');
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '设备名称',
            dataIndex: 'equipName',
            key: 'equipName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '设备状态',
            dataIndex: 'taskStatus',
            key: 'taskStatus',
        },
        {
            title: '连接状态',
            dataIndex: 'connectStatus',
            key: 'connectStatus',
        },
        {
            title: '技能（模型）包',
            key: 'SkillPack',
            dataIndex: 'SkillPack',
            render: (_, record) => (
                <Space size="middle">
                    {record.SkillPack.map(skill => (
                        <Tag key={skill}>{skill}</Tag>
                    ))}
                </Space>
            )
        },
        {
            title: '电量',
            dataIndex: 'quantityOfElectricity',
            key: 'quantityOfElectricity',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>召回</a>
                    <a>同步</a>
                    <a>删除</a>
                </Space>
            ),
        },
    ];

    return (
        <Spin spinning={loading}>
            <Table<DataType>
                columns={columns}
                dataSource={tableData}
                rowKey="key"
            />
        </Spin>
    );
};

export default EquipList;