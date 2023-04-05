import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class CounterParamDto {
  @ApiProperty()
  @IsUUID()
  @Expose()
  id: string;
}
