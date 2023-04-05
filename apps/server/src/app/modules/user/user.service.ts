import { PrismaClientService } from '@cybernetically/prisma/server';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { HashingService } from '../../services/hashing.service';
import { User } from './types/user.type';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    private prismaClient: PrismaClientService,
    private hashingService: HashingService
  ) {}

  async findByUsername(username: string): Promise<User> {
    try {
      return await this.prismaClient.user.findFirstOrThrow({
        where: {
          username,
        },
        include: {
          counter: true,
        },
      });
    } catch (err) {
      this.logger.error(err, err.stack);

      if (err.code === 'P2025') {
        throw new NotFoundException({
          message: 'NOT_FOUND',
          description: `User not found`,
        });
      }
    }
  }

  async create({ username, password }): Promise<User> {
    try {
      const hashPassword = await this.hashingService.hashPassword(password);

      return await this.prismaClient.$transaction(
        async (prisma = this.prismaClient) => {
          const user = await prisma.user.create({
            data: {
              username,
              password: hashPassword,
            },
          });

          const counter = await prisma.counter.create({
            data: {
              userId: user.id,
            },
          });

          return { ...user, counter };
        }
      );
    } catch (err) {
      this.logger.error(err, err.stack);

      throw new InternalServerErrorException({
        message: 'SERVER_ERROR',
        description: 'Something went wrong ;(',
      });
    }
  }

  async checkUniqUser(username: string): Promise<boolean> {
    const notExistingUser = await this.prismaClient.user.findFirst({
      where: {
        username,
      },
    });

    return !notExistingUser;
  }
}
