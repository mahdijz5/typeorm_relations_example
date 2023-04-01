import Front  from 'src/front/entities/front.entity';
import { Injectable } from "@nestjs/common";
import {  DeepPartial, DeleteResult, FindOneOptions, FindOptionsWhere, In, Like, Repository, UpdateResult } from "typeorm";
import Menu from "./entities/menu.entity";
import { InjectRepository } from "@nestjs/typeorm";
import {BadRequestException} from "@nestjs/common"
import { MenuFrontRepository } from "./menuFront.repository";
import { isEmpty } from "class-validator";
import { FrontRepository } from "src/front/front.repository";
import MenuFrontRl from './entities/menuFrontRl.enity';

@Injectable()
export class MenuRepository {
    constructor(@InjectRepository(Menu) private menuRepository : Repository<Menu>,private menuFrontRepository : MenuFrontRepository,private frontRepository :FrontRepository ){}

    create(data:DeepPartial<Menu>) : Menu {
        return this.menuRepository.create(data)
    }


    async updateRole(certification : FindOptionsWhere<Menu>,data : DeepPartial<Menu>): Promise<{affected?: number}> {
        if(isEmpty(data.name)) return {affected : 0}

        const isExist = await this.findOneBy({ name : data.name })
        if (isExist) throw new BadRequestException("Menu already exists")
        return await this.menuRepository.update(certification,data)
    }

    async update(data: DeepPartial<Menu>, id: number, frontIds: number[] = []) {
        try {

            const { menu,menuFront} =await this.provideRelationForUser(id)
            await this.updateRole({id},data)

            
            if (frontIds.length > 0) {
                menuFront.fronts = [...await this.frontRepository.findByListOfId(frontIds)]
                this.menuFrontRepository.save(menuFront)
            }

            return menu
        } catch (error) {
            throw error
        }
    }
    
    async provideRelationForUser(userId : number): Promise<{menu: Menu , menuFront : MenuFrontRl}> {
        try {
            let menuFront:MenuFrontRl;
            const menu = await this.findOne({
                where : { id : userId },
                relations : {menuFrontRl:{
                    fronts : true

                }}
            })
            if (!menu) throw new BadRequestException("User doesn't exist")

            if(isEmpty(menu.menuFrontRl)) {
                menuFront = this.menuFrontRepository.create({})
                menuFront.menu = menu
                this.menuFrontRepository.save(menuFront)
            }else {
                menuFront = menu.menuFrontRl
            } 

            return {menuFront: menuFront, menu: menu}
        } catch (error) {
            throw error
        }
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
    async findOne(certification:FindOneOptions<Menu>) : Promise<Menu> {
        return await this.menuRepository.findOne(certification)
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

    async findByListOfId(idList : number[]) {
        return await this.menuRepository.find({
            where : {id : In(idList)}            
        })
    }


    async getTree() {
        return await this.menuRepository.manager.getTreeRepository(Menu).findTrees()
    }   
}