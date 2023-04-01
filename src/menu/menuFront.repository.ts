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



    async JoinMenuAndFrontsByIdList(menu: Menu, frontIdList: number[]): Promise<MenuFrontRl> {
        const fronts = await this.frontRepository.findByListOfId(frontIdList)
        let menuFront: MenuFrontRl;
        if (fronts.length > 0) {
            menuFront = this.menuFrontRepository.create({ fronts: fronts })
        } else {
            const deafultFront = await this.frontRepository.findOneBy({ name: "user-front" })
            menuFront = this.menuFrontRepository.create({ fronts: [deafultFront] })
        }
        menuFront.menu = menu
        this.menuFrontRepository.save(menuFront)
        return menuFront
    }   

}