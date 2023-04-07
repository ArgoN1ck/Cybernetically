import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value, {
      strategy: 'excludeAll',
    });
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'VALIDATION_FAILED',
        description: errors.map(({ property, children, constraints }) => ({
          property,
          children,
          constraints,
        })),
      });
    }
    return object;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
