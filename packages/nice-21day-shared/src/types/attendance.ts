import { ITraining } from './training';
import { IAdmin } from './admin';
import { IPageParams } from './global';

export interface IAttendanceItem {
  deleted: string;
  description: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  training_id: string;
  attendance_tasks: string;
  attendance_date: string;
  audit_state: string;
  user: IAdmin;
  training: ITraining;
}

export interface IAttendanceRequest extends IPageParams {
  user_id?: string;
  training_id?: string;
  attendance_date?: string;
  audit_state?: string;
  with_training?: number;
  with_user?: number;
}
