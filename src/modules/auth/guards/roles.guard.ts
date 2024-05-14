import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/modules/users/roles.enums';

@Injectable()
export class RolesGuard implements CanActivate {
  //Inyectamos "Reflector" , que extrae metadata
  constructor(private readonly reflector:Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {


    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles',[
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasRole = () =>
      requiredRoles.some((role)=>user?.roles?.includes(role))
    const valid = user && user.roles && hasRole();

    if(!valid){
      throw new ForbiddenException('No tiene accesos para acceder a esta ruta')
    }
    return true;
  }
}
