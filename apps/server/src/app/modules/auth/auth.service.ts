import { Injectable, BadRequestException } from '@nestjs/common';
import { RoleEnum } from '../../shared/modules/jwt-token/enums/role.enum';
import { JwtTokenService } from '../../shared/modules/jwt-token/jwt-token.service';
import { UserService } from '../user/user.service';
import { AuthDto } from './dtos/auth.dto';
import { HashingService } from '../../services/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtTokenService: JwtTokenService,
    private hashingService: HashingService
  ) {}

  async signIn(authDto: AuthDto) {
    try {
      const { username, password } = authDto;

      const user = await this.userService.findByUsername(username);

      const isPasswordMatches = await this.hashingService.compare(
        password,
        user.password
      );

      if (!isPasswordMatches) {
        throw new Error();
      }

      return {
        accessToken: await this.jwtTokenService.createJwt({
          sub: user.id,
          username,
          role: RoleEnum.USER,
        }),
        user,
      };
    } catch (err) {
      throw new BadRequestException({
        message: 'BAD_REQUEST',
        description: 'Username or password is invalid',
      });
    }
  }

  async signUp(authDto: AuthDto) {
    const user = await this.userService.create(authDto);

    return {
      accessToken: await this.jwtTokenService.createJwt({
        sub: user.id,
        username: user.username,
        role: RoleEnum.USER,
      }),
      user,
    };
  }

  async validate(token: string) {
    const { username } = await this.jwtTokenService.verifyToken(token);

    return await this.userService.findByUsername(username);
  }
}
