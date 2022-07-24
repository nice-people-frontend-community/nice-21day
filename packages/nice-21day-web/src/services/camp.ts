import { request } from '@umijs/max';
import { CampsList } from '@nice-21day/shared';
/**
 * 查询用户信息
 */


 export const queryAllCampList = async (params: CampsList) => {
    return await request('/trainings', {
      params,
    });
  };