import { Request } from 'express';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface SessionUser {
  userId: string;
  isAdmin: boolean;
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): SessionUser => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return {
      userId: request.session.userId,
      isAdmin: request.session.isAdmin,
    };
  },
);