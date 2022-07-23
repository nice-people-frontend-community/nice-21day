import { ACCESS_TOKEN_LOCAL_KEY } from '@/constants';
import { login } from '@/services';
import { ILoginData } from '@/typings';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const onFinish = (values: ILoginData) => {
    setLoading(true);
    login(values)
      .then(({ access_token }) => {
        // 记录token
        localStorage.setItem(ACCESS_TOKEN_LOCAL_KEY, access_token);
        // 强制重刷一次
        window.location.href = '/admin';
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <div className={styles.login__header}>
          <h1>21天训练营登录</h1>
        </div>
        <Form
          className={styles.login__form}
          name="admin_login"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="login_name"
            rules={[{ required: true, message: '请输入登录账号' }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="登录账号"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入登录密码' }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="登录密码"
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 40 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
