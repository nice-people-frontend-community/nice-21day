import React from 'react';

// 组件库

import { Modal, Table } from 'antd';

interface IProps {
    isModalVisible: boolean,
    handleOk: () => void,
    dataSource: any[]
}

const TasksModal: React.FC<IProps> = (props) => {

    const { isModalVisible, handleOk, dataSource } = props;

    const columns = [
        {
            title: '任务名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '任务描述',
            dataIndex: 'description',
            key: 'description',
        },
    ];

    return (
        <Modal title="任务详情" visible={isModalVisible} onOk={handleOk} onCancel={handleOk}>
            <Table dataSource={dataSource} columns={columns} />
        </Modal>
    )
};

export default TasksModal;