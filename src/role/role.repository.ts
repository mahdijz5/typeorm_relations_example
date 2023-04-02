import { BadRequestException } from '@nestjs/common';
import {Inject,forwardRef, Injectable } from '@nestjs/common';
import {  Any, DeepPartial, DeleteResult, FindManyOptions, FindOneOptions, FindOptionsWhere, In, Like, Repository, UpdateResult } from "typeorm";
import Role from "./entities/role.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { MenuRoleRepository } from './menuRole.repository';
import { RoleEnum } from 'src/utils/enums';
import MenuRoleRl from './entities/menuRoleRl.entity';
import { isEmpty } from 'class-validator';
import { MenuRepository } from 'src/menu/menu.repository';

@Injectable()
export class RoleRepository {
    constructor(@InjectRepository(Role) private roleRepository: Repository<Role>, private menuRoleRepository : MenuRoleRepository, @Inject(forwardRef(() => MenuRepository)) private menuRepository : MenuRepository,) {}
    
    async updateRole(certification : FindOptionsWhere<Role>,data : DeepPartial<Role>): Promise<{affected?: number}> {
        if(isEmpty(data.name)) return {affected : 0}

        const isExist = await this.findOneBy({ name : data.name })
        if (isExist) throw new BadRequestException("Role already exists")
        return await this.roleRepository.update(certification,data)
    }

    async update(data: DeepPartial<Role>, id: number, menuIds: number[] = []) : Promise<Role> {
        try {
            const { role,roleMenu} =await this.provideRelationForUser(id)
            await this.updateRole({id},data)

            
            if (menuIds.length > 0) {
                roleMenu.menus = [...await this.menuRepository.findByListOfId(menuIds)]
                this.menuRoleRepository.save(roleMenu)
            }

            return role
        } catch (error) {
            throw error
        }
    }
    
    async provideRelationForUser(userId : number): Promise<{role: Role , roleMenu : MenuRoleRl}> {
        try {
            let roleMenu:MenuRoleRl;
            const role = await this.findOne({
                where : { id : userId },
                relations : {menuRoleRl:{
                    menus : true
                }}
            })
            if (!role) throw new BadRequestException("User doesn't exist")

            if(isEmpty(role.menuRoleRl)) {
                roleMenu = this.menuRoleRepository.create({})
                roleMenu.role = role
                this.menuRoleRepository.save(roleMenu)
            }else {
                roleMenu = role.menuRoleRl
            } 

            return {roleMenu: roleMenu, role: role}
        } catch (error) {
            throw error
        }
    }


    async getRoleOf(id:number[]):Promise<Role[]>{
        try {
            return await this.find({
                where : {
                    userRoleRl : {
                        user : {
                            id : Any([...id])
                        }
                    }
                },
                relations : {userRoleRl:{
                    user : true
                }}
            })
        } catch (error) {
            throw error
        }
    }

    async search(limit:number,page : number ,searchQuery : string): Promise<Role[]> {
        const query = `%${searchQuery}%`
        return await this.roleRepository.find({
            where : {name : Like(query)},
            relations : {menuRoleRl : {
                menus : true
            }},
            take : limit,
            skip : (page -1) * limit
        })
    }


    async findByListOfId(idList : number[]) : Promise<Role[]>{
        return await this.roleRepository.find({
            where : {id : In(idList)}            
        })
    }

    // ! BASICS
    
    async remove(id:number) : Promise<Role> {
        const role =await this.findOne({
            where : {id},
            relations  :{menuRoleRl : true}
        })
        if(!role) {throw new BadRequestException("Role doesn't exist")}
        await this.menuRoleRepository.remove(role.menuRoleRl.id)
        return await this.roleRepository.remove(role)
    }

    async save(role:Role) {
        return await this.roleRepository.save(role)
    }

    async findOneBy(certification:FindOptionsWhere<Role>) : Promise<Role> {
        return await this.roleRepository.findOneBy(certification)
    }

    async find(certification:FindManyOptions<Role>) : Promise<Role[]> {
        return await this.roleRepository.find(certification)
    }

    async findOne(certification:FindOneOptions<Role>) : Promise<Role> {
        return await this.roleRepository.findOne(certification)
    }

    create(data:DeepPartial<Role>) : Role {
        return this.roleRepository.create(data)
    }
}