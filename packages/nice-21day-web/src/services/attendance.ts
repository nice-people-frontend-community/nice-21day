import { IQueryAttendanceParams } from '@nice-21day/shared';
import { request } from '@umijs/max';

/**
 * 获取打卡记录分页列表
 */
export const queryAttendanceList = async (params: IQueryAttendanceParams) => {
  return await request('/user-attendance-logs', { params });
};
