import { ICounter } from './counter.model';

export interface IUser {
  id: string;
  username: string;
  password: string;
  counter?: ICounter;
}
