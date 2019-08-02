import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from '@zorko/dto';
import { RolesMetadataKey } from './roles.decorator';
import { ConfigService } from '../config/config.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    if (!this.configService.isAuthEnabled) {
      return true;
    }

    const roles = this.reflector.get<RolesEnum[]>(RolesMetadataKey, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () => user.roles.some((role) => roles.includes(role));

    return user && user.roles && hasRole();
  }
}
