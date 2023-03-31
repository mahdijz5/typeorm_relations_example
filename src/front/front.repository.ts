import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Front from "./entities/front.entity";
import { DeepPartial, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class FrontRepository {
    constructor(@InjectRepository(Front) private frontRepository : Repository<Front>){}

    
    create(data:DeepPartial<Front>) : Front {
        return this.frontRepository.create(data)
    }

    async update(data:DeepPartial<Front>,id:number) : Promise<UpdateResult> {
        return await this.frontRepository.update({id},data)
    }

    async remove(id:number) : Promise<void> {
        await this.frontRepository.delete({id})
    }

    async save(role:Front) {
        return await this.frontRepository.save(role)
    }

    async findOneBy(certification:FindOptionsWhere<Front>) : Promise<Front> {
        return await this.frontRepository.findOneBy(certification)
    }

    createQueryBuilder(entity:string) {
        return this.frontRepository.createQueryBuilder(entity)
    }
    
}