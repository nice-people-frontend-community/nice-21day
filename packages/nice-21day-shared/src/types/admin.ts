import { EState } from './common';

export interface IAdmin {
  id: string;
  login_name: string;
  nick_name: string;
  password: string;
  state: EState;
  deleted: boolean;
}
