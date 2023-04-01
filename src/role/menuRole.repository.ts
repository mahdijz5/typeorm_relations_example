import { Injectable } from "@nestjs/common";
import {  DeepPartial, DeleteResult, FindOptionsWhere, Repository, UpdateResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import {BadRequestException} from "@nestjs/common"
import dataSource from "db/data-source";
import { FrontRepository } from "src/front/front.repository";
import Front from 'src/front/entities/front.entity';
import MenuRoleRl from './entities/menuRoleRl.entity';
import Role from "./entities/role.entity";
import { MenuRepository } from "src/menu/menu.repository";

@Injectable()
export class MenuRoleRepository {
    constructor(@InjectRepository(MenuRoleRl) private menuRoleRepository : Repository<MenuRoleRl>,private menuRepository :MenuRepository){}


    create(data: DeepPartial<MenuRoleRl>) {
        return this.menuRoleRepository.create(data)
    }

    async save(menuRole: MenuRoleRl) {
        return await this.menuRoleRepository.save(menuRole)
    }

    async JoinRoleAndMenusByIdList(role: Role, menuIdList: number[]): Promise<MenuRoleRl> {
        const menus = await this.menuRepository.findByListOfId(menuIdList)
        let menuRole: MenuRoleRl;
        if (menus.length > 0) {
            menuRole = this.create({ menus: menus })
        } else {
            menuRole = this.create({ menus: [] })
        }
        menuRole.role = role
        await this.menuRoleRepository.save(menuRole)
        return menuRole
    }   

}