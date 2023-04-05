import { counter, user } from '@prisma/client';

export type User = user & { counter?: counter };
