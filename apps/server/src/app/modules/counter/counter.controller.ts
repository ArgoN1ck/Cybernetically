import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { CounterService } from './counter.service';
import { CounterQueryDto } from './dtos/counter-query.dto';
import { CounterDto } from './dtos/counter.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CounterParamDto } from './dtos/counter-param.dto';
import { Counter } from './types/counter.type';

@ApiTags('Counters')
@Controller()
export class CounterController {
  constructor(private counterService: CounterService) {}

  @Get('counter')
  async findByUser(userId: string) {
    return await this.counterService.findByUserId(userId);
  }

  @Get('counters/increment')
  async incrementCount(@Query() { value }: CounterQueryDto) {
    return await this.counterService.incrementCount(value);
  }

  @ApiBody({
    type: CounterDto,
  })
  @Put('counters/:id')
  async saveCount(
    @Param() { id }: CounterParamDto,
    @Body() { count }: CounterDto
  ): Promise<Counter> {
    return await this.counterService.save(id, count);
  }
}
