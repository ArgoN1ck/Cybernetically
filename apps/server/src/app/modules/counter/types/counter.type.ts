import { counter } from '@prisma/client';
import { User } from '../../user/types/user.type';

export type Counter = counter & { user?: User };
