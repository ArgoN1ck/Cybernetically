import { IUser } from '../../../shared/models/user.model';

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}
