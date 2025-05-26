import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActiveUserTypeInterface } from '../interfaces/active-user-type.interface';

export const ActiveUserDecorator = createParamDecorator(
  (
    field: keyof ActiveUserTypeInterface | undefined,
    context: ExecutionContext,
  ) => {
    const request = context.switchToHttp().getRequest();

    const user: ActiveUserTypeInterface = request.user;

    return field ? user?.[field] : user; // Return the entire user object or a specific field
  },
);
