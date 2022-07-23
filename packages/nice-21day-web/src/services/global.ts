import { ILoginData } from '@/typings';
import { ICurentUser } from '@nice-21day/shared';
import { request } from '@umijs/max';

/**
 * 管理员登录
 */
export const login = async (data: ILoginData) => {
  return await request<{ access_token: string }>('/auth/admin/login', {
    method: 'POST',
    data: { ...data },
  });
};

/**
 * 获取当前登录人
 */
export const queryCurrentUser = async () => {
  return await request<ICurentUser>('/auth/current-users');
};
