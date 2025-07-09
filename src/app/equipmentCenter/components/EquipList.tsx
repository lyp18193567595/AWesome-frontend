

// @ts-ignore
import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
    key: string;
    equipName: string;
    taskStatus: string;
    connectStatus: string;
    SkillPack: string[];
    quantityOfElectricity:string;
}

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
        render:(_,) => (
            <Space size = "middle">
                <a>
                    巡检专家
                </a>

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

const data: DataType[] = [
    {
        key: '1',
        equipName: '无人机01',
        taskStatus: '任务中',
        connectStatus: '在线',
        SkillPack: ['nice', 'developer'],
        quantityOfElectricity:'80%'
    },
    {
        key: '2',
        equipName: '小车',
        taskStatus: '空闲',
        connectStatus: '断线',
        SkillPack: ['loser'],
        quantityOfElectricity:'80%'
    },
    {
        key: '3',
        equipName: '小车10',
        taskStatus: '空闲',
        connectStatus: '在线',
        SkillPack: ['cool', 'teacher'],
        quantityOfElectricity:'80%'
    },
];

const EquipList: React.FC = () => <Table<DataType> columns={columns} dataSource={data} />;

export default EquipList;