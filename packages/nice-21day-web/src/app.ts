// 运行时配置

import { BasicLayoutProps } from '@ant-design/pro-components';
import { history, RequestConfig } from '@umijs/max';
import { message, Modal } from 'antd';
import { ACCESS_TOKEN_LOCAL_KEY } from './constants';
import { queryCurrentUser } from './services';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  const currentUser = await queryCurrentUser();
  return { name: currentUser.nick_name };
}

export const layout = (): BasicLayoutProps => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    layout: 'mix',
    // @ts-ignore
    logout: () => {
      Modal.confirm({
        title: '确定要退出登录吗？',
        onOk: () => {
          localStorage.removeItem(ACCESS_TOKEN_LOCAL_KEY);
          history.push('/login');
        },
      });
    },
  };
};

export const request: RequestConfig = {
  timeout: 1000,
  baseURL: '/api/v1',
  // other axios options you want
  errorConfig: {
    errorHandler(error) {
      console.error('api error', error);
      message.error(error?.response?.data?.message || '请求错误');
    },
    errorThrower() {},
  },
  requestInterceptors: [
    (config) => {
      const token = localStorage.getItem(ACCESS_TOKEN_LOCAL_KEY);
      // 没有登录请求，并且没有 token 的时候直接进入登录页面
      if (config.url.indexOf('/admin/login') === -1 && !token) {
        history.push('/login');
      }

      // 禁止缓存
      const url = config.url.concat(`?t=${+new Date()}`);

      return {
        ...config,
        url,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    },
  ],
  responseInterceptors: [
    (response) => {
      return response;
    },
  ],
};
