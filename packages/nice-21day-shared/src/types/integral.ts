import { EBooleanString, IPageParams } from './global';
import { ITraining } from './training';
import { IUser } from './user';

export interface IIntegralLog {
  attendance_log_id: string;
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
  score:number,
  previous_score:number,
  trigger_type:string
}

export enum EIntegralLogAuditState {
  // 有效打卡
  Attendance = 'attendance',
  // 无效打卡
  InvalidAttendance = 'valid',
  // 请假
  Leave = 'leave',
  // 缺勤
  Absence = 'absence'
}

export interface IQueryIntegralParams extends IPageParams {
  user_id?: string;
  training_id?: string;
  trigger_type?: EIntegralLogAuditState;
  with_training?: EBooleanString;
  with_user?: EBooleanString;
}
