import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {decode} from "jsonwebtoken";
import { isEmpty } from 'src/utils/tools';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (isEmpty(roles)) return true
        
        const req = context.switchToHttp().getRequest();
        const authHeader = req.get("Authorization")
        if(isEmpty(authHeader)) return false
        
        const user:any =  decode(authHeader.split(' ')[1])
        return user.roles.filter(role => roles.indexOf(role.name) >= 0).length > 0 ? true : false
    }
}
