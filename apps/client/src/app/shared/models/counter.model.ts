import { IUser } from './user.model';

export interface ICounter {
  id: string;
  count: number;
  userId: string;
  user?: IUser;
}
