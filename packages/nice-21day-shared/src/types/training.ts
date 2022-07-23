import { EState } from './global';
export interface ITraining {
  deleted: string;
  description: string;
  created_at: string;
  updated_at: string;
  name: string;
  type: string;
  period: number;
  start_time: string;
  end_time: string;
  state: EState;
  fee: number;
  standard_score: number;
  progress: string;
}
