
import React, { useRef, useState } from 'react';
// 组件库
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Select, Switch, Spin, Space, Popconfirm } from 'antd';
// 工具库
import { useRequest } from '@umijs/max';
import { IMemberItem } from '@nice-21day/shared';
import { payment_state_map, reached_map, progress_map } from './format';
// service
import {
    queryUsersList,
    changeUsersStateAPI, // 启用、禁用
    queryAllTrainingNameList, // 训练营成员列表

} from '@/services';
// 子组件
import TasksModal from './tasksModal';

const Member: React.FC = () => {
    const actionRef: any = useRef<ActionType>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tasksDatasource, setTasksDatasource] = useState([]);

    // 成员搜索
    const {
        data: trainingNameList = [],
        run: trainingNameRun,
        loading: trainingNameLoading
    } = useRequest(queryAllTrainingNameList, {
        debounceInterval: 500,
        manual: true
    });

    // 启用、禁用
    const {
        run: changeUsersStateAPIRun,
    } = useRequest(changeUsersStateAPI, {
        manual: true,
        onSuccess: () => {
            actionRef?.current?.reload();
        }
    });

    const columns: ProColumns<IMemberItem>[] = [
        {
            title: '成员名称',
            dataIndex: 'userName',
            key: 'userName',
            width: 160,
            fixed: 'left',
            render: (_, record) => {
                return record.user?.nick_name || record.user_id;
            },
        },
        {
            title: '训练营',
            dataIndex: 'training',
            valueType: 'select',
            width: 100,
            render: (_, record) => {
                return record.training?.name || record.training_id;
            },
            renderFormItem: () => {
                return (
                    <Select
                        showSearch
                        allowClear
                        loading={trainingNameLoading}
                        onSearch={(value) => {
                            if (value) {
                                trainingNameRun(value)
                            }
                        }}
                        notFoundContent={
                            trainingNameLoading ? <Spin size="small" /> : '未查询到内容'
                        }
                    >
                        {trainingNameList.map((item: { id: string, name: string }) => (
                            <Select.Option key={item.id} value={item.name}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                );
            },
        },
        {
            title: '训练营进度',
            dataIndex: 'progress',
            width: 100,
            ellipsis: true,
            render: (_, record) => {
                return record?.training?.progress && progress_map?.[record.training.progress];
            },
            renderFormItem: () => {
                return (
                    <Select allowClear>
                        {
                            Object.entries(progress_map)?.map(([key, value]) => (
                                <Select.Option key={key} value={key}>
                                    {value}
                                </Select.Option>
                            ))
                        }
                    </Select>
                );
            },
        },
        {
            title: '期望任务',
            dataIndex: 'tasks',
            width: 100,
            search: false,
            ellipsis: true,
            render: (_, record) => {
                return (
                    <>
                        {
                            record?.tasks ? (
                                <a
                                    onClick={() => {
                                        setTasksDatasource(record?.tasks ? JSON.parse(record?.tasks) : [])
                                        setIsModalVisible(true)
                                    }}
                                >
                                    {JSON.parse(record?.tasks)?.length}
                                </a>
                            ) : '--'
                        }
                    </>

                );
            },
        },
        {
            title: '状态',
            dataIndex: 'state',
            width: 100,
            search: false,
            render: (_, record) => {
                return (
                    <Switch
                        checkedChildren="开启"
                        unCheckedChildren="关闭"
                        checked={_ === 'enable'}
                        onChange={(checked: boolean) => {
                            const state = checked ? 'enable' : 'disable'
                            changeUsersStateAPIRun(record.id, state)
                        }}
                    />
                );
            },

        },
        {
            title: '积分',
            dataIndex: 'score',
            width: 100,
            search: false,
            ellipsis: true,
        },
        {
            title: '达标情况',
            dataIndex: 'reached',
            width: 100,
            render: (_, record) => {
                return record?.reached === '0' ? '未达标' : '已达标';
            },
            renderFormItem: () => {
                return (
                    <Select allowClear>
                        {
                            Object.entries(reached_map)?.map(([key, value]) => (
                                <Select.Option key={key} value={key}>
                                    {value}
                                </Select.Option>
                            ))
                        }
                    </Select>
                );
            },
        },
        {
            title: '押金',
            dataIndex: 'payment_state',
            width: 100,
            render: (_, record) => {
                return payment_state_map?.[record.payment_state];
            },
            renderFormItem: () => {
                return (
                    <Select allowClear>
                        {
                            Object.entries(payment_state_map)?.map(([key, value]) => (
                                <Select.Option key={key} value={key}>
                                    {value}
                                </Select.Option>
                            ))
                        }
                    </Select>
                );
            },
        },
        {
            title: '报名时间',
            dataIndex: 'created_at',
            valueType: 'dateTime',
            width: 200,
            search: false,
        },
        {
            title: '操作',
            dataIndex: 'operate',
            valueType: 'option',
            width: 200,
            search: false,
            fixed: 'right',
            render: (_, record) => (
                <Space>
                    <a>编辑 </a>
                    <a>打卡记录</a>
                    <Popconfirm
                        title="确定要删除吗？"
                        okText="确定"
                        cancelText="取消"
                        onConfirm={() => {
                            console.log(record);
                        }}
                    >
                        <a>删除</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <ProTable<IMemberItem>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                headerTitle="成员管理列表"
                request={async ({ pageSize, current, ...rest }) => {
                    const res = await queryUsersList({
                        ...rest,
                        size: pageSize!,
                        number: current!,
                    });
                    return {
                        data: res?.rows,
                        total: res?.total,
                        success: true,
                    };
                }}

                rowKey="id"
                scroll={{ x: 1000 }}
                search={{
                    labelWidth: 100,
                    defaultCollapsed: false,
                }}
                pagination={{
                    pageSize: 10,
                }}

                toolBarRender={() => [
                    <Button key="button" icon={<PlusOutlined />} type="primary">
                        新建
                    </Button>,
                ]}
            />
            <TasksModal
                isModalVisible={isModalVisible}
                handleOk={() => setIsModalVisible(false)}
                dataSource={tasksDatasource}
            />
        </>

    );

};

export default Member;
