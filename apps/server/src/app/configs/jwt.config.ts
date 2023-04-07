import { JwtModuleOptions } from '@nestjs/jwt';

import * as env from 'env-var';
import { Algorithm } from 'jsonwebtoken';

export const jwtConfig: JwtModuleOptions = {
  secret: env.get('JWT_SECRET').required().asString(),
  signOptions: {
    algorithm: env
      .get('JWT_ALGORITHM')
      .default('HS256')
      .asString() as Algorithm,
  },
};
