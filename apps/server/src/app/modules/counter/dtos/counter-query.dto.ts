import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class CounterQueryDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  value: number;
}
