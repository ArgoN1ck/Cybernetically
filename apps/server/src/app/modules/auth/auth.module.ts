import { Module } from '@nestjs/common';
import { JwtTokenModule } from '../../shared/modules/jwt-token/jwt-token.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { HashingService } from '../../services/hashing.service';

@Module({
  imports: [JwtTokenModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, HashingService],
  exports: [AuthService],
})
export class AuthModule {}
