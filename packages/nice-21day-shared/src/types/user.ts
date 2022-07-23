import { EState } from './global';

export interface IUser {
  id: string;
  wechat_openid: string;
  nick_name: string;
  avatar_url: string;
  state: EState;
  description: string;
  created_at: string;
  updated_at?: string;
  deleted_at?: boolean;
  deleted: boolean;
}
