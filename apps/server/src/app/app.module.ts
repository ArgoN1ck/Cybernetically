import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { PrismaClientModule } from '@cybernetically/prisma/server';

import { prismaClientConfig } from './configs/orm.config';
import { HealthCheckController } from './health-check.controller';
import { AuthModule } from './modules/auth/auth.module';
import { AuthMiddleware } from './modules/auth/middlewares/auth.middleware';
import { UserModule } from './modules/user/user.module';
import { CounterModule } from './modules/counter/counter.module';

@Module({
  imports: [
    PrismaClientModule.forRoot(prismaClientConfig),
    AuthModule,
    UserModule,
    CounterModule,
  ],
  controllers: [HealthCheckController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('auth/(.*)').forRoutes('*');
  }
}
