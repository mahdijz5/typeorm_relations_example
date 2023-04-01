import Role from 'src/role/entities/role.entity';
import { ArrayContainedBy, ArrayContains, DeepPartial, FindOptionsWhere, In, Repository } from 'typeorm';
import {BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleRl } from './entities/userRoleRl.entity';
import { RoleRepository } from 'src/role/role.repository';
import { User } from './entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { isEmpty } from 'class-validator';

@Injectable()
export class UserRoleRepository {
    constructor(@InjectRepository(UserRoleRl) private userRoleRepository: Repository<UserRoleRl>, private roleRepository: RoleRepository, ) { }

    create(data: DeepPartial<UserRoleRl>) {
        return this.userRoleRepository.create(data)
    }

    async save(userRole: UserRoleRl) {
        return await this.userRoleRepository.save(userRole)
    }

    async JoinUserAndRole(user: User, roles?: Role[]): Promise<UserRoleRl> {
        let userRole: UserRoleRl;
        if (roles) {
            userRole = this.userRoleRepository.create({ roles: roles })
        } else {
            const deafultRole = await this.roleRepository.findOneBy({ name: "user" })
            userRole = this.userRoleRepository.create({ roles: [deafultRole] })
        }
        userRole.user = user;
        return userRole;
    }

    async JoinUserAndRolesByIdList(user: User, menuIdList: number[]): Promise<UserRoleRl> {
        const roles = await this.roleRepository.findByListOfId(menuIdList)
        let userRole: UserRoleRl;
        userRole = this.create({ roles : [] })
        if (roles.length > 0) {
            userRole.roles = roles
        } else {
            const defaultRole = await this.roleRepository.findOneBy({ name: "user" })
            userRole.roles.push(defaultRole)
        }
        userRole.user = user
        return await this.save(userRole)
    }

}
