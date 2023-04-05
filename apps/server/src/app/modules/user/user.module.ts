import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { HashingService } from '../../services/hashing.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, HashingService],
  exports: [UserService],
})
export class UserModule {}
