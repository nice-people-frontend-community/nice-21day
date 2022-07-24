import React from 'react';
import { queryAttendanceListAPI } from '@/services/attendance';
import { ProColumns, ProTable, ActionType } from '@ant-design/pro-components';
import { EAttendanceLogAuditState, IAttendanceLog } from '@nice-21day/shared';
import { Button, Select, Spin } from 'antd';
import {
  useGetNickNameList,
  useGetTrainingkNameList,
  useChangeAttendanceAuditState,
} from './hook';

const Attendance: React.FC = () => {
  const nickNameRef = React.useRef<number>();
  const trainingNameRef = React.useRef<number>();
  const actionRef = React.useRef<ActionType>();
  const { nickNameLoading, nickNameList, getNickNameList } =
    useGetNickNameList();

  const { trainingNameLoading, trainingNameList, getTrainingNameList } =
    useGetTrainingkNameList();

  const { changeAttendanceAuditState } = useChangeAttendanceAuditState();

  const handleNickNameChange = (value: string) => {
    if (nickNameRef.current) {
      clearTimeout(nickNameRef.current);
    }
    nickNameRef.current = window.setTimeout(() => {
      if (value) {
        getNickNameList(value);
      }
    }, 800);
  };

  const handleTrainingNameChange = (value: string) => {
    if (trainingNameRef.current) {
      clearTimeout(trainingNameRef.current);
    }
    trainingNameRef.current = window.setTimeout(() => {
      if (value) {
        getTrainingNameList(value);
      }
    }, 800);
  };

  const handleChangeAuditState = (
    id: string,
    state: EAttendanceLogAuditState,
  ) => {
    changeAttendanceAuditState(id, state, actionRef);
  };

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
      renderFormItem: () => {
        return (
          <Select
            showSearch
            allowClear
            loading={nickNameLoading}
            onSearch={handleNickNameChange}
            notFoundContent={
              nickNameLoading ? <Spin size="small" /> : '未查询到内容'
            }
          >
            {nickNameList.map((item) => (
              <Select.Option key={item.id} value={item.nick_name}>
                {item.nick_name}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: '训练营',
      dataIndex: 'training',
      valueType: 'select',
      render: (_, record) => {
        return record.training?.name || record.training_id;
      },
      renderFormItem: () => {
        return (
          <Select
            showSearch
            allowClear
            loading={trainingNameLoading}
            onSearch={handleTrainingNameChange}
            notFoundContent={
              trainingNameLoading ? <Spin size="small" /> : '未查询到内容'
            }
          >
            {trainingNameList.map((item) => (
              <Select.Option key={item.id} value={item.name}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        );
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
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() =>
              handleChangeAuditState(record.id, EAttendanceLogAuditState.Valid)
            }
          >
            审核通过
          </Button>
          <Button
            type="link"
            onClick={() =>
              handleChangeAuditState(
                record.id,
                EAttendanceLogAuditState.Invalid,
              )
            }
          >
            审核未通过
          </Button>
        </>
      ),
    },
  ];
  return (
    <ProTable<IAttendanceLog>
      bordered
      headerTitle="打卡记录列表"
      columns={columns}
      rowKey="id"
      actionRef={actionRef}
      search={{ collapsed: false }}
      request={async ({ pageSize, current, ...rest }) => {
        const res = await queryAttendanceListAPI({
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
