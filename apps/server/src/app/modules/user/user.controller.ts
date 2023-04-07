import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AvailableUserDto } from './dtos/available-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiResponse({
    schema: {
      type: 'boolean',
      example: false,
    },
  })
  @Get('available/username')
  async isNotExist(@Query() { q }: AvailableUserDto): Promise<boolean> {
    return await this.userService.checkUniqUser(q);
  }
}
