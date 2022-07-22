// 运行时配置

import { BasicLayoutProps } from '@ant-design/pro-components';
import { message } from 'antd';
import { RequestConfig } from './.umi/exports';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
// export async function getInitialState(): Promise<{ name: string }> {
//   return { name: '@umijs/max' };
// }

export const layout = (): BasicLayoutProps => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    layout: 'mix',
  };
};

export const request: RequestConfig = {
  timeout: 1000,
  baseURL: '/api/v1',
  // other axios options you want
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  requestInterceptors: [],
  responseInterceptors: [
    (response) => {
      return response;
    },
  ],
};
