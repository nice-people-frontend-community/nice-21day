import { EState } from './global';

export interface IAdmin {
  id: string;
  login_name: string;
  nick_name: string;
  /** 查询时不会返回密码 */
  password?: string;
  state: EState;
  deleted: boolean;
  created_at: string;
  updated_at?: string;
  deleted_at?: boolean;
}
