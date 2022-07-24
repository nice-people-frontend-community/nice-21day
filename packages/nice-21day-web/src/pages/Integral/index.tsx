import React from 'react';
import { queryIntegralListAPI } from '@/services/integral';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { EIntegralLogAuditState,IIntegralLog } from '@nice-21day/shared';
import { Select, Spin } from 'antd';
import {
  useGetNickNameList,
  useGetTrainingkNameList
} from './hook';

const Integral: React.FC = () => {
  const nickNameRef = React.useRef<number>();
  const trainingNameRef = React.useRef<number>();
  const { nickNameLoading, nickNameList, getNickNameList } =
    useGetNickNameList();

  const { trainingNameLoading, trainingNameList, getTrainingNameList } =
    useGetTrainingkNameList();

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
  const columns: ProColumns<IIntegralLog>[] = [
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
      title: '变更前积分',
      dataIndex: 'previous_score',
      search: false,
      ellipsis: true,
      width: 200,
    },
    {
      title: '变更后积分',
      dataIndex: 'score',
      search: false,
      ellipsis: true,
      width: 200,
    },
    {
      title: '变更原因',
      dataIndex: 'trigger_type',
      valueType: 'select',
      valueEnum: {
        [EIntegralLogAuditState.Attendance]: {
          text: '有效打卡'
        },
        [EIntegralLogAuditState.InvalidAttendance]: {
          text: '无效打卡',
        },
        [EIntegralLogAuditState.Leave]: {
          text: '请假',
        },
        [EIntegralLogAuditState.Absence]: {
          text: '缺勤'
        },
      },
    },
    {
      title: '变更记录',
      dataIndex: 'trigger_type',
      search: false,
      render: (_, record) => {
        return (record.score - record.previous_score) > 0 ? '+' + (record.score - record.previous_score) : record.score - record.previous_score;
      }
    },
    {
      title: '变更时间',
      dataIndex: 'updated_at',
      valueType: 'dateTime',
      search: false
    }
  ];
  return (
    <ProTable<IIntegralLog>
      bordered
      headerTitle="积分变更列表"
      columns={columns}
      rowKey="id"
      search={{ collapsed: false }}
      request={async ({ pageSize, current, ...rest }) => {
        const res = await queryIntegralListAPI({
          ...rest,
          size: pageSize!,
          page: current!,
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

export default Integral;
