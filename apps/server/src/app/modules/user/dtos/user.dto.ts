import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  username: string;
}
