import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../../decorators/role-protected.decorator';
import { User } from '../../entities/users.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    if (!validRoles || validRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (!user) throw new BadRequestException('User not found');

    const foundSomeRole = validRoles.some((validRol) =>
      user.roles.includes(validRol),
    );

    // return foundSomeRole;

    if (foundSomeRole) return true;

    throw new ForbiddenException(
      `User ${user.fullName} need a valid role: [${validRoles}]`,
    );
  }
}
