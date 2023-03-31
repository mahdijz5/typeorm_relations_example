import { Injectable } from "@nestjs/common";
import {  DeepPartial, FindOptionsWhere, Repository, UpdateResult } from "typeorm";
import Menu from "./entities/menu.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MenuRepository {
    constructor(@InjectRepository(Menu) private menuRepository : Repository<Menu>){}

    create(data:DeepPartial<Menu>) : Menu {
        return this.menuRepository.create(data)
    }

    async update(data:DeepPartial<Menu>,id:number) : Promise<UpdateResult> {
        return await this.menuRepository.update({id},data)
    }

    async remove(id:number) : Promise<void> {
        await this.menuRepository.delete({id})
    }

    async save(menu:Menu) {
        return await this.menuRepository.save(menu)
    }

    async findOneBy(certification:FindOptionsWhere<Menu>) : Promise<Menu> {
        return await this.menuRepository.findOneBy(certification)
    }

    createQueryBuilder(entity:string) {
        return this.menuRepository.createQueryBuilder(entity)
    }
}