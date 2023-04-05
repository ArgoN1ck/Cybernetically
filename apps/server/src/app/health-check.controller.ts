import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('health-check')
@Controller('health-check')
export class HealthCheckController {
  @ApiResponse({
    schema: {
      properties: {
        status: {
          type: 'string',
          example: 'OK',
        },
      },
    },
  })
  @Get()
  async healthCheck() {
    return { status: 'OK' };
  }
}
