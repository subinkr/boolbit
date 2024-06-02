import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const AuthId = createParamDecorator((_, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  const id = req.id;

  if (!id) {
    throw new UnauthorizedException('You need to login');
  }

  return id;
});
