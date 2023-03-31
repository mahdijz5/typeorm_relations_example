import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateRoleParams } from 'src/utils/types';
import { UserRoleRepository } from 'src/user/user.role.repository';;
import { UpdateResult } from 'typeorm';
import Menu from './entities/menu.entity';
import { MenuRepository } from './menu.repository';

@Injectable()
export class MenuService {
    constructor(private menuRepository : MenuRepository) {}

    async create(data : CreateRoleParams) : Promise<Menu> {
        try {
            const isExist = await this.menuRepository.findOneBy({name : data.name})
            if(isExist) throw new BadRequestException('Menu already exists')
            const role = this.menuRepository.create({...data})

            await this.menuRepository.save(role)
            
            return role
        } catch (error) {
            throw error
        }
    }

    async update(data : CreateRoleParams,id:number)  {
        try {
            await this.menuRepository.update(data,id)
        } catch (error) {
            throw error
        }
    }

    async remove(id:number)  {
        try {
            await this.menuRepository.remove(id)
        } catch (error) {
            throw error
        }
    }

    async find(limit: number, page: number, searchQuery :string) {
        const query = `%${searchQuery}%`
        try {
            const queryBuilder = this.menuRepository.createQueryBuilder('role')
            queryBuilder.where('role.name LIKE :query', { query }).limit(limit).offset((page - 1) * limit);
            return await queryBuilder.getMany();
        } catch (error) {
            throw error
        }
    }
}
