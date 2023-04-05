import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }

  async createJwt(payload: IPayload) {
    return await this.createAccessToken(payload);
  }

  private async createAccessToken(payload: IPayload) {
    return await this.jwtService.signAsync(payload);
  }
}
