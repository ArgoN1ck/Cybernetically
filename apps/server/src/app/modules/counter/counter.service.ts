import { PrismaClientService } from '@cybernetically/prisma/server';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class CounterService {
  private logger = new Logger(CounterService.name);
  constructor(private prismaClient: PrismaClientService) {}

  async findByUserId(userId: string) {
    try {
      return await this.prismaClient.counter.findFirstOrThrow({
        where: {
          userId,
        },
      });
    } catch (err) {
      this.logger.error(err, err.stack);

      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `Counter not found`,
        });
      }
    }
  }

  async incrementCount(value: number) {
    return {
      currentValue: value,
      incrementValue: value > 0 ? value * 2 : value + 1,
    };
  }

  async save(id: string, count: number) {
    try {
      return await this.prismaClient.counter.update({
        data: {
          count,
        },
        where: {
          id,
        },
      });
    } catch (err) {
      this.logger.error(err, err.stack);

      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `Counter not found`,
        });
      }
    }
  }
}
