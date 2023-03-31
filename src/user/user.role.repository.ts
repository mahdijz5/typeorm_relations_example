import Role from 'src/role/entities/role.entity';
import { ArrayContainedBy, ArrayContains, In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleRl } from './entities/userRoleRl.entity';
import { RoleRepository } from 'src/role/role.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserRoleRepository {
    constructor(@InjectRepository(UserRoleRl) private userRoleRepository: Repository<UserRoleRl>, private roleRepository: RoleRepository) { }

    async findOneBy(certificate: object): Promise<UserRoleRl> {
        const userRole = await this.userRoleRepository.findOneBy(certificate)
        return userRole
    }

    async createWithRole(...roles: Role[]) : Promise<UserRoleRl> {
        const userRole = this.userRoleRepository.create({ roles: [...roles] })
        return await this.userRoleRepository.save(userRole)
    }

    async findOneByRole(role: string): Promise<UserRoleRl> {
        const userRole = await this.userRoleRepository.createQueryBuilder('user').leftJoinAndSelect('user.roles', 'roles')
            .where('roles.name = :name', { name: role })
            .getOne();
        return userRole
    }

    async save(userRole: UserRoleRl) {
        return await this.userRoleRepository.save(userRole)
    }

    async JoinUserAndRole(user: User, roles?: Role[]): Promise<UserRoleRl> {
        let userRole: UserRoleRl
        if (roles) {
            userRole = this.userRoleRepository.create({ roles: roles })
        } else {
            const deafultRole = await this.roleRepository.findOneBy({ name: "user" })
            userRole = this.userRoleRepository.create({ roles: [deafultRole] })
        }
        userRole.user = user
        return userRole
    }
}
