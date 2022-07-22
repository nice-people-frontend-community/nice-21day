import { request } from '@umijs/max';
import { IAttendanceRequest } from '@nice-21day/shared';

interface IQueryAttendanceListParams {
  current: number;
  pageSize: number;
  user_id?: string;
  training_id?: string;
  audit_state?: string;
}

/**
 * 获取打卡记录分页列表
 */
export const queryAttendanceList = async (
  params: IQueryAttendanceListParams,
) => {
  let temp: IAttendanceRequest = JSON.parse(
    JSON.stringify(params)
      .replace('current', 'page')
      .replace('pageSize', 'size'),
  );
  return await request('/user-attendance-logs', { params: temp });
};
