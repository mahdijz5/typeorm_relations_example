import { Injectable } from "@nestjs/common";
import {  DeepPartial, DeleteResult, FindOptionsWhere, Like, Repository, UpdateResult } from "typeorm";
import Menu from "./entities/menu.entity";
import { InjectRepository } from "@nestjs/typeorm";
import {BadRequestException} from "@nestjs/common"
import { MenuFrontRepository } from "./menuFront.repository";

@Injectable()
export class MenuRepository {
    constructor(@InjectRepository(Menu) private menuRepository : Repository<Menu>,private menuFrontRepository : MenuFrontRepository){}

    create(data:DeepPartial<Menu>) : Menu {
        return this.menuRepository.create(data)
    }

    async update(data:DeepPartial<Menu>,id:number,frontIds: number[] = [])  {      
        const menu = await this.menuRepository.findOneBy({id})
        if(!menu) throw new BadRequestException("Menu doesn't exist")
        menu.name = data.name
        await this.menuRepository.save(menu)
        if(frontIds.length > 0){
            const menuFront = await this.menuFrontRepository.JoinMenuAndFrontsByIdList(menu,frontIds)
        }
        return menu
    }

    async remove(id:number) : Promise<DeleteResult> {
        const result = await this.menuRepository.delete({id})
        if(result.affected === 0) {throw new BadRequestException("Menu doesn't exist")}
        return result
    }

    async save(menu:Menu): Promise<Menu> {
        return await this.menuRepository.save(menu)
    }

    async findOneBy(certification:FindOptionsWhere<Menu>) : Promise<Menu> {
        return await this.menuRepository.findOneBy(certification)
    }

    async search(limit:number,page : number ,searchQuery : string): Promise<Menu[]> {
        const query = `%${searchQuery}%`
        return await this.menuRepository.find({
            where : {name : Like(query)},
            relations : {menuFrontRl : {
                fronts : true
            }},
            take : limit,
            skip : (page -1) * limit
        })
    }

    async getTree() {
        return await this.menuRepository.manager.getTreeRepository(Menu).findTrees()
    }   
}