import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: AuthDto })
  @Post('sign-up')
  async signUp(@Body() authDto: AuthDto) {
    return await this.authService.signUp(authDto);
  }

  @ApiBody({ type: AuthDto })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() authDto: AuthDto) {
    return await this.authService.signIn(authDto);
  }
}
