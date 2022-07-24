import {
  IQueryIntegralParams
} from '@nice-21day/shared';
import { request } from '@umijs/max';

/**
 * 获取积分变更记录
 */
export const queryIntegralListAPI = async (params: IQueryIntegralParams) =>
  await request('/user-score-logs', { params });

