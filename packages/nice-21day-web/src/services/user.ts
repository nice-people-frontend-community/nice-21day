import { request } from '@umijs/max';
/**
 * 查询用户信息
 */
export const queryAllNickNameList = async (nick_name: string) => {
  return await request('/users/as-list', {
    params: { nick_name },
  });
};
