import { RoleEnum } from '../enums/role.enum';

export interface IPayload {
  sub: string;
  username: string;
  role: RoleEnum;
}
