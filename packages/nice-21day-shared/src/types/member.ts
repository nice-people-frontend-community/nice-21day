
import { IPageParams } from './global';
import { ITraining } from './training';
import { IUser } from './user';

export interface IMemberItem {
    id: string;
    user_id: string;
    user?: IUser;
    training_id: string;
    training?: ITraining;
    description: string;
    created_at: string;
    updated_at: string;
    payment_state: string;
    reached: string;
    score: number;
    state: string;
    tasks: string;

}

export interface IqueryMemberItem extends IPageParams {
    user_id?: string;
}
