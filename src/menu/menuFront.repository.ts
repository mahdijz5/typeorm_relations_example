import MenuFrontRl  from 'src/menu/entities/menuFrontRl.enity';
import { Injectable } from "@nestjs/common";
import {  DeepPartial,  Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { FrontRepository } from "src/front/front.repository";

@Injectable()
export class MenuFrontRepository {
    constructor(@InjectRepository(MenuFrontRl) private menuFrontRepository : Repository<MenuFrontRl>,private frontRepository : FrontRepository){}


    create(data : DeepPartial<MenuFrontRl>) : MenuFrontRl {
        return this.menuFrontRepository.create(data)
    }

    async save(data  : MenuFrontRl) : Promise<MenuFrontRl>{
        return await this.menuFrontRepository.save(data)
    }

}