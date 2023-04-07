import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserDto } from '../../user/dtos/user.dto';

export class AuthDto implements UserDto {
  @ApiProperty()
  @Expose()
  password: string;

  @ApiProperty()
  @Expose()
  username: string;
}
