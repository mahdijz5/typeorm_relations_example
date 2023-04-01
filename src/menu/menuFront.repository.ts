import MenuFrontRl  from 'src/menu/entities/menuFrontRl.enity';
import { Injectable } from "@nestjs/common";
import {  DeepPartial, DeleteResult, FindOptionsWhere, Repository, UpdateResult } from "typeorm";
import Menu from "./entities/menu.entity";
import { InjectRepository } from "@nestjs/typeorm";
import {BadRequestException} from "@nestjs/common"
import dataSource from "db/data-source";
import { FrontRepository } from "src/front/front.repository";
import Front from 'src/front/entities/front.entity';

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