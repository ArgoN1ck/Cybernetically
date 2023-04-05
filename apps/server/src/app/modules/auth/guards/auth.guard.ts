import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      throw new UnauthorizedException({
        message: 'UNAUTHORIZED',
        description: 'Missing token',
      });
    }

    return !!request.user;
  }
}
