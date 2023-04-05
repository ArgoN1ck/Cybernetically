import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AvailableUserDto {
  @ApiProperty()
  @Expose()
  q: string;
}
