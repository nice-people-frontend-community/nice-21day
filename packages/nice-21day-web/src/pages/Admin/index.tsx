import { queryAdminsList } from '@/services';
import { PlusOutlined } from '@ant-design/icons';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { IAdmin } from '@nice-21day/shared';
import { history } from '@umijs/max';
import { Button, Space } from 'antd';
import React from 'react';

const Admin: React.FC = () => {
  const columns: ProColumns<IAdmin>[] = [
    {
      title: '登录名',
      dataIndex: 'login_name',
    },
    {
      title: '昵称',
      dataIndex: 'nick_name',
    },
    {
      title: '状态',
      dataIndex: 'state',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: () => (
        <Space>
          <span>编辑</span>
          <span>删除</span>
        </Space>
      ),
    },
  ];

  return (
    <ProTable<IAdmin>
      rowKey="id"
      size="small"
      bordered
      pagination={false}
      request={async () => {
        const admins = await queryAdminsList();
        return {
          success: true,
          data: admins,
        };
      }}
      columns={columns}
      search={false}
      headerTitle="管理员列表"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => history.push('/admin/create')}
        >
          新建
        </Button>,
      ]}
    />
  );
};

export default Admin;
