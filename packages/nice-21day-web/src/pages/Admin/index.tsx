import { queryAdminsList } from '@/services';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { IAdmin } from '@nice-21day/shared';
import { Space } from 'antd';
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
        const res = queryAdminsList();
        return res;
      }}
      columns={columns}
      search={false}
      headerTitle="管理员列表"
    />
  );
};

export default Admin;
