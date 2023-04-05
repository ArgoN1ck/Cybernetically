import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CounterService } from './counter.service';
import { CounterDto } from './dtos/counter.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CounterParamDto } from './dtos/counter-param.dto';
import { Counter } from './types/counter.type';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../auth/decorators/user.decorator';

@ApiTags('Counters')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller()
export class CounterController {
  constructor(private counterService: CounterService) {}

  @Get('counter')
  async findByUser(@User('id') userId: string) {
    return await this.counterService.findByUserId(userId);
  }

  @Get('counters/increment')
  async incrementCount(@User('id') userId: string) {
    const { count, userId: ownerId } = await this.counterService.findByUserId(
      userId
    );

    if (ownerId !== userId) {
      throw new ForbiddenException({
        message: 'FORBIDDEN',
        description: 'You have no permissions to change another counter!',
      });
    }

    return await this.counterService.incrementCount(count);
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
