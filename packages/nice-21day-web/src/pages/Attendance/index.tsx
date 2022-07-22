import React from 'react';
import { ProTable, ProColumns } from '@ant-design/pro-components';
import { queryAttendanceList } from '../../services/attendance';
import { IAttendanceItem, EAUDIT_STATE } from '@nice-21day/shared';
// import { Select } from 'antd';

const AUDIT_STATUS = [
  { value: EAUDIT_STATE.PENDING, label: '未审核' },
  { value: EAUDIT_STATE.VALID, label: '审核通过' },
  { value: EAUDIT_STATE.INVALID, label: '审核未通过' },
];

const Attendance: React.FC = () => {
  const request = async () => AUDIT_STATUS;
  const columns: ProColumns<IAttendanceItem>[] = [
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName',
      search: false,
      render: (...res) => {
        return res[1].user.nick_name;
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
      render: (...res) => res[1].training.name,
      valueType: 'select',
    },
    {
      title: '打卡内容',
      dataIndex: 'attendance_tasks',
      search: false,
      render: (...res) => {
        const data = JSON.parse(res[1].attendance_tasks);
        console.log(
          JSON.parse(res[1].attendance_tasks),
          'JSON.parse(res[1].attendance_tasks)',
        );
        return res[1].attendance_tasks;
      },
    },
    {
      title: '提交时间',
      dataIndex: 'updated_at',
      valueType: 'date',
      search: false,
    },
    {
      title: '审核状态',
      dataIndex: 'audit_state',
      valueType: 'select',
      request,
      render: (...res) =>
        AUDIT_STATUS.find((item) => item.value === res[1].audit_state)?.label,
    },
    {
      title: '编辑时间',
      dataIndex: 'editTime',
      valueType: 'date',
      search: false,
    },
    {
      title: '补卡',
      dataIndex: 'reissueTime',
      valueType: 'date',
      search: false,
    },
    {
      title: '备注',
      dataIndex: 'description',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      valueType: 'option',
    },
  ];
  return (
    <ProTable<IAttendanceItem>
      headerTitle="打卡记录列表"
      columns={columns}
      rowKey="id"
      search={{ collapsed: false }}
      request={async (params) => {
        const res = await queryAttendanceList(params);
        console.log(params, res, 'params');
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
