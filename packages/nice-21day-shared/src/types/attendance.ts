import { EBooleanString, IPageParams } from './global';
import { ITraining } from './training';
import { IUser } from './user';

export interface IAttendanceLog {
  id: string;
  user_id: string;
  user?: IUser;
  training_id: string;
  training?: ITraining;
  attendance_date: string;
  attendance_tasks: string;
  audit_state: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export enum EAttendanceLogAuditState {
  // 未审核
  Pending = 'pending',
  // 审核通过
  Valid = 'valid',
  // 审核未通过
  Invalid = 'invalid',
}

export interface IQueryAttendanceParams extends IPageParams {
  user_id?: string;
  training_id?: string;
  attendance_date?: string;
  audit_state?: EAttendanceLogAuditState;
  with_training?: EBooleanString;
  with_user?: EBooleanString;
}
