import { Injectable, BadRequestException } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { CreateRoleParams } from 'src/utils/types';
import { UserRoleRepository } from 'src/user/user.role.repository';
import Role from './entities/role.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class RoleService {
    constructor(private roleRepository : RoleRepository) {}

    async create(data : CreateRoleParams) : Promise<Role> {
        try {
            const isExist = await this.roleRepository.findOneBy({name : data.name})
            if(isExist) throw new BadRequestException('Role already exists')
            const role = this.roleRepository.create({...data})

            await this.roleRepository.save(role)
            
            return role
        } catch (error) {
            throw error
        }
    }

    async update(data : CreateRoleParams,id:number)  {
        try {
            await this.roleRepository.update(data,id)
        } catch (error) {
            throw error
        }
    }

    async remove(id:number)  {
        try {
            await this.roleRepository.remove(id)
        } catch (error) {
            throw error
        }
    }

    async find(limit: number, page: number, searchQuery :string) {
        const query = `%${searchQuery}%`
        try {
            const queryBuilder = this.roleRepository.createQueryBuilder('role')
            queryBuilder.where('role.name LIKE :query', { query }).limit(limit).offset((page - 1) * limit);
            return await queryBuilder.getMany();
        } catch (error) {
            throw error
        }
    }
}
