import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health-check')
@Controller('health-check')
export class HealthCheckController {
  @Get()
  async healthCheck() {
    return { status: 'OK' };
  }
}
