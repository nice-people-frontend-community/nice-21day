import { useMemo, useState, useEffect } from 'react';
import { Button, Space, Table, Form, Input, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
const { Option } = Select;
import styles from './index.less';
import { history } from '@umijs/max';
import { queryAllCampList } from '@/services/camp';
const optionType = [
  { name: '全部', key: 'all' },
  { name: '禁用', key: 'off' },
  { name: '开启', key: 'on' },
];

const optionList = optionType.map((option) => (
  <Option key={option.key} value={option.key}>
    {option.name}
  </Option>
));

const progressType = [
  { name: '全部', key: 'all' },
  { name: '报名中', key: 'being' },
  { name: '进行中', key: 'ing' },
  { name: '已结束', key: 'finish' },
];

const progressList = progressType.map((option) => (
  <Option key={option.key} value={option.key}>
    {option.name}
  </Option>
));

interface tableType {
  name: string;
  type: string;
  progress: number;
  nums: string;
  time: string;
  isMoney: string;
  status: string;
  desc: string;
}

const columns: ColumnsType<tableType> = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '进度',
    dataIndex: 'progress',
    key: 'progress',
  },
  {
    title: '期数',
    key: 'nums',
    dataIndex: 'nums',
  },
  {
    title: '起止时间',
    key: 'time',
    dataIndex: 'time',
  },
  {
    title: '是否需要押金',
    key: 'isMoney',
    dataIndex: 'isMoney',
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: '备注信息',
    key: 'desc',
    dataIndex: 'desc',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>启用 {record.name}</a>
        <a>禁用</a>
        <a>编辑</a>
        <a>删除</a>
      </Space>
    ),
  },
];

const CampList: React.FC = () => {
  const [campData, setCampData] = useState<tableType[]>([]);
  useEffect(() => {
    queryAllCampList({ page: 1, size: 10 }).then((res) => {
      setCampData(res.rows);
    });
  }, []);

  return (
    <div className={styles.campMain}>
      <div className={styles.campForm}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="inline"
        >
          <Form.Item label="类型:" name="type">
            <Input />
          </Form.Item>
          <Form.Item name="status" label="状态" style={{ width: '150px' }}>
            <Select allowClear>{optionList}</Select>
          </Form.Item>
          <Form.Item name="progress" label="进度" style={{ width: '150px' }}>
            <Select allowClear>{progressList}</Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              重置
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={() => history.push('/campList/edit')}
            >
              新建
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.table}>
        <Table columns={columns} dataSource={campData} />
      </div>
    </div>
  );
};
export default CampList;
