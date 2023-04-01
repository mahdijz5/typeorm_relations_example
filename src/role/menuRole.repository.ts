import { Injectable } from "@nestjs/common";
import {  DeepPartial, Repository } from "typeorm";
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
 

}