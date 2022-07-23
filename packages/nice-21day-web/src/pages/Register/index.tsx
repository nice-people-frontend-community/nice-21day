import { Button, Form, Input, message } from 'antd';
import styles from './index.module.less';
interface IUser {
  username: string;
  password: string;
  rePassword: string;
}
function Register() {
  const onFinish = (values: IUser) => {
    const { password, rePassword } = values;
    if (password !== rePassword) {
      message.error('两次输入的密码不一致');
      return;
    }
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={styles.container}>
      <div className={styles.registerForm}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '用户名是必选项目' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="重复密码"
            name="rePassword"
            rules={[{ required: true, message: '请再次输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
