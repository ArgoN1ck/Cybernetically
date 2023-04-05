import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './jwt-token.service';
import { jwtConfig } from '../../../configs/jwt.config';

@Module({
  imports: [JwtModule.register(jwtConfig)],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtTokenModule {}
