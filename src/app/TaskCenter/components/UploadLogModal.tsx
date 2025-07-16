// @ts-ignore
import React from 'react';
import { Modal } from 'antd';

interface UploadLogModalProps {
    visible: boolean;
    onClose: () => void;
    taskInfo: any; // 或者定义更具体的类型
}

const UploadLogModal: React.FC<UploadLogModalProps> = ({ visible, onClose, taskInfo }) => {
    return (
        <Modal
            title={`上传日志 - ${taskInfo?.TaskName}`}
            open={visible}
            onOk={onClose}
            onCancel={onClose}
        >
            <p>任务名称: {taskInfo?.TaskName}</p>
            <p>任务设备: {taskInfo?.TaskEquipment}</p>
            {/* 这里添加你的上传表单或其他内容 */}
            <p>上传区域...</p>
        </Modal>
    );
};
export default UploadLogModal;




