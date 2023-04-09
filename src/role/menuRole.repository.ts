import { Injectable } from "@nestjs/common";
import {  DeepPartial, DeleteResult, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import MenuRoleRl from './entities/menuRoleRl.entity';

@Injectable()
export class MenuRoleRepository {
    constructor(@InjectRepository(MenuRoleRl) private menuRoleRepository : Repository<MenuRoleRl>){}


    create(data: DeepPartial<MenuRoleRl>) {
        return this.menuRoleRepository.create(data)
    }

    async save(menuRole: MenuRoleRl) {
        return await this.menuRoleRepository.save(menuRole)
    }

    async remove(id: number):Promise<DeleteResult> {
        return await this.menuRoleRepository.delete({id})
    }
 

}