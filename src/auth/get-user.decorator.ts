import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const user = {
    email: req.user.email,
    role: req.user.role,
    loginedAt: req.user.loginedAt,
  };
  return user;
});
