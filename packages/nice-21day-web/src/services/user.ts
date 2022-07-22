import { request } from '@umijs/max';
/**
 * 查询用户信息
 */
export const queryAllUsersList = async (nick_name: string) => {
  return await request('/api/v1/users/as-list', {
    params: { nick_name },
  });
};
