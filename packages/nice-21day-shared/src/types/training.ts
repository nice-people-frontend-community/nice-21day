import { EState } from './global';
export interface ITraining {
  id: string;
  name: string;
  type: string;
  period: number;
  start_time: string;
  end_time: string;
  fee: number;
  standard_score: number;
  progress: string;
  state: EState;

  description: string;
  created_at: string;
  updated_at: string;
  deleted: string;
}
