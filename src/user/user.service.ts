import { FrontRepository } from './../front/front.repository';
import { MenuRepository } from 'src/menu/menu.repository';
import { UserRepository } from './user.repository';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UpdateUserParams } from 'src/utils/types';
import { RoleRepository } from 'src/role/role.repository';
import Role from 'src/role/entities/role.entity';
import Menu from 'src/menu/entities/menu.entity';
import Front from 'src/front/entities/front.entity';

@ApiTags("User")
@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository, private roleRepository: RoleRepository, private menuRepository: MenuRepository, private frontRepository: FrontRepository) { }


    async getUser(id: number) {
        try {
            const user = await this.userRepository.findOne({
                relations: {
                    userRoleRl: {
                        roles: true
                    }
                },
                where: { id }
            })
            if (!user) throw new NotFoundException()

            delete user.password
            return user
        } catch (error) {
            throw error
        }
    }

    async updateUserByAdmin(data: UpdateUserParams, id: number, rolesId: number[]) {
        try {
            return await this.userRepository.updateByAdmin(data, id, rolesId)
        } catch (error) {
            throw error
        }
    }

    async updateUser(data: UpdateUserParams, id: number) {
        try {
            const result = await this.userRepository.updateUser({ id }, data)
            if (result.affected <= 0) throw new BadRequestException("User doesn't exist")
        } catch (error) {
            throw error
        }
    }

    async delete( id: number) {
        try {
            await this.userRepository.remove(id)
        } catch (error) {
            throw error
        }
    }

    async find(limit:number,page:number,searchQuery:string) {
            try {
                return this.userRepository.search(limit,page,searchQuery)
            } catch (error) {
                throw error
            }
    }

    async getRoles(idList: number[]): Promise<Role[]> {
        try {
            return await this.roleRepository.getRoleOf(idList)
        } catch (error) {
            throw error
        }
    }

    async getMenus(idList: number[],tree = true): Promise<Menu[]> {
        try {
            const roles = await this.getRoles(idList)
            const rolesIdList = []

            for (const role of roles) rolesIdList.push(role.id)

            if(tree) {
                return await this.menuRepository.getMenuOfInTreeForm(idList)
            }else {
                return await this.menuRepository.getMenuOf(idList)
            }

        } catch (error) {
            throw error
        }
    }

    async getFronts(idList: number[]): Promise<Front[]> {
        try {
            const menus = await this.getMenus(idList,false)
            const menusIdList = []

            for (const menu of menus) menusIdList.push(menu.id)

            return await this.frontRepository.getFrontOf(idList)
        } catch (error) {
            throw error
        }
    }

}
