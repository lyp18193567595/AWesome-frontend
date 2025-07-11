

/**
 * 任务中心
 */

// @ts-ignore
import React, {useState} from 'react';
import {Col, Row, Select, Space, Table, Tag, DatePicker, TimePicker, TimePickerProps, type GetProps, Input} from 'antd';
import type { TableProps } from 'antd';
// @ts-ignore
import dayjs from 'dayjs';
import UploadLogModal from './components/UploadLogModal'; // 确保路径正确

interface DataType {
    key: string;
    TaskName: string;
    TaskStatus: string;
    TaskEquipment: string;
    TaskCreateTime: string;
    TaskEndTime:string;
    TaskStartTime:string;
    log:string;
}
type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const TaskCenter: React.FC = () => {
    const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentTask, setCurrentTask] = useState<DataType | null>(null);

    const data: DataType[] = [
        {
            key: '1',
            TaskName: '巡检01',
            TaskStatus: '任务中',
            TaskEquipment: '无人机01',
            TaskCreateTime:'2025-07-09 16:00:00',
            TaskStartTime:'2025-07-09 19:00:00',
            TaskEndTime:' ',
            log:'日志'
        },
        {
            key: '2',
            TaskName: '物流01',
            TaskStatus: '已完成',
            TaskEquipment: '小最01',
            TaskCreateTime: '2025-07-09 16:00:00',
            TaskEndTime:'2025-07-09 16:00:00',
            TaskStartTime:'2025-07-10 17:00:00',
            log:'未上传'
        },
        {
            key: '3',
            TaskName: '巡检02',
            TaskStatus: '任务失败',
            TaskEquipment: '小车03',
            TaskCreateTime: '2025-07-09 16:00:00',
            TaskEndTime:'2025-07-09 16:00:00',
            TaskStartTime:'2025-07-10 18:00:00',
            log:'未上传'
        },
        {
            key: '4',
            TaskName: '仓储02',
            TaskStatus: '任务创建失败',
            TaskEquipment: '小车04',
            TaskCreateTime: '2025-07-09 16:00:00',
            TaskEndTime:'2025-07-09 16:00:00',
            TaskStartTime:'2025-07-10 18:00:00',
            log:'未上传'
        },
    ];


    // 获取所有不重复的状态值
    // @ts-ignore
    const allStatus = [...new Set(data.map(item => item.TaskStatus))];

    // 筛选数据
    // @ts-ignore
    const filteredData = data.filter(item => {
        if (!statusFilter) {
            return true;
        }
        return item.TaskStatus === statusFilter;
    });

    const onChange: TimePickerProps['onChange'] = (time, timeString) => {
        console.log(time, timeString);
    };

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    // 处理上传日志点击
    const handleUploadLog = (record: DataType) => {
        setCurrentTask(record);
        setModalVisible(true);
    };

    // 关闭弹框
    const handleModalClose = () => {
        setModalVisible(false);
        setCurrentTask(null);
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '任务名称',
            dataIndex: 'TaskName',
            key: 'TaskName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '任务状态',
            dataIndex: 'TaskStatus',
            key: 'TaskStatus',
        },
        {
            title: '任务设备',
            dataIndex: 'TaskEquipment',
            key: 'TaskEquipment',
        },
        {
            title: '任务创建时间',
            key: 'TaskCreateTime',
            dataIndex: 'TaskCreateTime',
        },
        {
            title: '任务开始时间',
            dataIndex: 'TaskStartTime',
            key: 'TaskStartTime',
        },
        {
            title: '任务结束时间',
            dataIndex: 'TaskEndTime',
            key: 'TaskEndTime',
        },
        {
            title: '日志',
            dataIndex: 'log',
            key: 'log',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>实时详情</a>
                    <a onClick={() => handleUploadLog(record)}>上传日志</a>
                </Space>
            ),
        },
    ];



    return (
        <div style={{ padding: '20px' }}>
            <Search placeholder="输入搜索关键词" onSearch={onSearch} style={{ width: 400, paddingBottom: '30px' }} />
            <Row gutter={16} style={{ marginBottom: '20px' }}>
                <Col span={6}>
                    <Space align="center">
                        <span>任务状态</span>
                        <Select
                            placeholder="任务状态"
                            style={{ width: '100%' }}
                            allowClear
                            onChange={setStatusFilter}
                            options={allStatus.map(status => ({
                                value: status,
                                label: status,
                            }))}
                        />
                    </Space>
                </Col>
                <Col span={6}>
                    <Space align="center">
                        <span>开始时间</span>
                        <TimePicker
                            onChange={onChange}
                            defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                        />
                    </Space>
                </Col>
                <Col span={6}>
                    <Space align="center">
                        <span>结束时间</span>
                        <TimePicker
                            onChange={onChange}
                            defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                        />
                    </Space>
                </Col>
            </Row>
            <Table<DataType>
                columns={columns}
                dataSource={filteredData}
                bordered
                pagination={{ pageSize: 10 }}
            />

            {/* 上传日志弹框 */}
            {currentTask && (
                <UploadLogModal
                    visible={modalVisible}
                    onClose={handleModalClose}
                    taskInfo={currentTask}
                />
            )}
        </div>
    );
};

export default TaskCenter;

