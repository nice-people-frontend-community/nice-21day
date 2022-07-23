import {
  IQueryAttendanceParams,
  EAttendanceLogAuditState,
} from '@nice-21day/shared';
import { request } from '@umijs/max';

/**
 * 获取打卡记录分页列表
 */
export const queryAttendanceListAPI = async (params: IQueryAttendanceParams) =>
  await request('/user-attendance-logs', { params });

/**
 * 编辑审核状态
 */
export const changeAttendanceAuditStateAPI = async (
  id: string,
  audit_state: EAttendanceLogAuditState,
) =>
  await request(`/user-attendance-logs/${id}/audit-state`, {
    method: 'PUT',
    params: { audit_state },
  });
