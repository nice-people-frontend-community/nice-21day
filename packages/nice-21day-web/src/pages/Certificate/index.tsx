import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Upload,
} from 'antd';
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from 'antd/lib/upload';
import html2canvas from 'html2canvas';
import { useMemo, useState } from 'react';
import templateImage from './assets/template.jpeg';
import styles from './index.less';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

/** 训练营类型 */
const TRAINING_TYPE = ['学习训练营'];

interface IFormValue {
  /** 训练营名称 */
  trainingName: string;
  /** 训练营期数 */
  trainingNo: string;
  /** 学员名称 */
  userName: string;
  /** 学员头像 base64 */
  userAvatar: string;
  /** 打卡天数 */
  clockDays: string;
  /** 总目标数 */
  totalTargetCount: string;
  /** 总积分 */
  totalPoints: string;
}

export default function HomePage() {
  // form 表单数据
  const [formValues, setFormValues] = useState<IFormValue>({} as IFormValue);

  const handleFormChange = (
    changedValues: Partial<IFormValue & { userAvatarUpload: any }>,
  ) => {
    const { userAvatarUpload, ...restValues } = changedValues;
    setFormValues((prevValues) => ({
      ...prevValues,
      ...restValues,
    }));
  };

  const handleCreateImage = (values: IFormValue) => {
    const imgName = `${values.userName}_21天${values.trainingName}第${values.trainingNo}期.jpg`;
    html2canvas(document.getElementById('template')!).then((canvas) => {
      let img = document.createElement('a');
      img.href = canvas
        .toDataURL('image/jpeg')
        .replace('image/jpeg', 'image/octet-stream');
      img.download = imgName;
      img.click();
    });
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 类型的图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片不能超过 2MB');
    }
    return false;
  };

  const handleAvatarChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    getBase64(info.file as RcFile, (url) => {
      setFormValues((prevValues) => ({
        ...prevValues,
        userAvatar: url,
      }));
    });
  };

  const metrics = useMemo(
    () => [
      {
        label: '打卡天数',
        value: formValues.clockDays,
      },
      {
        label: '总目标数',
        value: formValues.totalTargetCount,
      },
      {
        label: '总积分数',
        value: formValues.totalPoints,
      },
    ],
    [formValues.clockDays, formValues.totalTargetCount, formValues.totalPoints],
  );

  return (
    <Row gutter={10} className={styles.content}>
      <Col span={12}>
        <div className={styles.template} id="template">
          {/* 模板图片 */}
          <img src={templateImage} />
          {/* 标题 */}
          <div className={styles['training-title']}>
            21天{formValues.trainingName || '--'}第
            {formValues.trainingNo || '--'}期
          </div>
          {/* 学员信息 */}
          <div className={styles.user}>
            <div className={styles.user__avatar}>
              <img src={formValues.userAvatar} />
            </div>
            <div className={styles.user__name}>{formValues.userName}</div>
          </div>
          {/* 打卡指标 */}
          <div className={styles.result}>
            {metrics.map((metric) => (
              <div key={metric.label} className={styles['result-metric']}>
                <div className={styles['result-metric__value']}>
                  {metric.value || 0}
                </div>
                <div className={styles['result-metric__label']}>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Col>
      <Col span={8}>
        <Form<IFormValue>
          labelCol={{ span: 6 }}
          onValuesChange={handleFormChange}
          onFinish={handleCreateImage}
        >
          <Divider orientation="left">训练营设置</Divider>
          <Form.Item
            name="trainingName"
            label="训练营"
            rules={[{ required: true, message: '请选择训练营类型' }]}
          >
            <Select placeholder="请选择训练营类型">
              {TRAINING_TYPE.map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="trainingNo"
            label="训练营期数"
            rules={[{ required: true, message: '请输入训练营期数' }]}
          >
            <InputNumber
              min={1}
              max={999}
              placeholder="请输入训练营期数"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Divider orientation="left">学员设置</Divider>
          <Form.Item
            name="userName"
            label="学员姓名"
            rules={[{ required: true, message: '请输入学员姓名' }]}
          >
            <Input placeholder="请输入学员姓名" />
          </Form.Item>
          <Form.Item
            name="userAvatarUpload"
            label="学员头像"
            valuePropName="file"
            rules={[{ required: true, message: '请上传学员头像' }]}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleAvatarChange}
            >
              {formValues.userAvatar ? (
                <img
                  src={formValues.userAvatar}
                  alt="avatar"
                  style={{ height: '100%' }}
                />
              ) : (
                <div>
                  {<PlusOutlined />}
                  <div style={{ marginTop: 8 }}>选择图片</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name="clockDays"
            label="打卡天数"
            rules={[{ required: true, message: '请输入打卡天数' }]}
          >
            <InputNumber
              min={0}
              max={21}
              placeholder="请输入打卡天数"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="totalTargetCount"
            label="总目标数"
            rules={[{ required: true, message: '请输入总目标数' }]}
          >
            <InputNumber
              min={0}
              max={99}
              placeholder="请输入总目标数"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="totalPoints"
            label="总积分"
            rules={[{ required: true, message: '请输入总积分' }]}
          >
            <InputNumber
              min={0}
              max={99}
              placeholder="请输入总积分"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6 }}>
            <Button type="primary" htmlType="submit">
              生成证书
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
