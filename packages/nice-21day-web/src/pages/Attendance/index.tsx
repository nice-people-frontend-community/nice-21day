import { ProColumns, ProTable } from '@ant-design/pro-components';
import { EAttendanceLogAuditState, IAttendanceLog } from '@nice-21day/shared';
import React from 'react';
import { queryAttendanceList } from '../../services/attendance';

const Attendance: React.FC = () => {
  const columns: ProColumns<IAttendanceLog>[] = [
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName',
      search: false,
      render: (_, record) => {
        return record.user?.nick_name || record.user_id;
      },
    },
    {
      title: '成员',
      dataIndex: 'nick_name',
      hideInTable: true,
      valueType: 'select',
    },
    {
      title: '训练营',
      dataIndex: 'training',
      valueType: 'select',
      render: (_, record) => {
        return record.training?.name || record.training_id;
      },
    },
    {
      title: '打卡内容',
      dataIndex: 'attendance_tasks',
      search: false,
      ellipsis: true,
      width: 200,
    },
    {
      title: '提交时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '审核状态',
      dataIndex: 'audit_state',
      valueType: 'select',
      valueEnum: {
        [EAttendanceLogAuditState.Pending]: {
          text: '未审核',
          status: 'Processing',
        },
        [EAttendanceLogAuditState.Valid]: {
          text: '审核通过',
          status: 'Success',
        },
        [EAttendanceLogAuditState.Invalid]: {
          text: '审核未通过',
          status: 'Error',
        },
      },
    },
    {
      title: '编辑时间',
      dataIndex: 'updated_at',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '补卡',
      dataIndex: 'reissueTime',
      valueType: 'date',
      search: false,
      // TODO: 当提交时间的日期和 attendance_date 不是同一天是就是补卡
    },
    {
      title: '备注',
      dataIndex: 'description',
      search: false,
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      valueType: 'option',
    },
  ];
  return (
    <ProTable<IAttendanceLog>
      bordered
      headerTitle="打卡记录列表"
      columns={columns}
      rowKey="id"
      search={{ collapsed: false }}
      request={async ({ pageSize, current, ...rest }) => {
        const res = await queryAttendanceList({
          ...rest,
          size: pageSize!,
          number: current!,
        });
        return {
          data: res.rows,
          total: res.total,
          success: true,
        };
      }}
    />
  );
};

export default Attendance;
