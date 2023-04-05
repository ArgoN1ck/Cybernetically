import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@cybernetically/prisma/server';

import { prismaClientConfig } from './configs/orm.config';
import { HealthCheckController } from './health-check.controller';
import { UserModule } from './modules/user/user.module';
import { CounterModule } from './modules/counter/counter.module';

@Module({
  imports: [
    PrismaClientModule.forRoot(prismaClientConfig),
    UserModule,
    CounterModule,
  ],
  controllers: [HealthCheckController],
})
export class AppModule {}
