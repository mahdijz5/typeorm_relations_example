import { Any, DeleteResult, FindManyOptions, In } from 'typeorm';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Front from "./entities/front.entity";
import { DeepPartial, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { BadRequestException } from "@nestjs/common"

@Injectable()
export class FrontRepository {
    constructor(@InjectRepository(Front) private frontRepository: Repository<Front>) { }


    create(data: DeepPartial<Front>): Front {
        return this.frontRepository.create(data)
    }

    async update(data: DeepPartial<Front>, id: number): Promise<UpdateResult> {
        const result = await this.frontRepository.update({ id }, data)
        if (result.affected === 0) { throw new BadRequestException("Front doesn't exist") }
        return result
    }

    async remove(id: number): Promise<DeleteResult> {
        const result = await this.frontRepository.delete({ id })
        if (result.affected === 0) { throw new BadRequestException("Front doesn't exist") }
        return result
    }

    async save(role: Front) {
        return await this.frontRepository.save(role)
    }

    async findOneBy(certification: FindOptionsWhere<Front>): Promise<Front> {
        return await this.frontRepository.findOneBy(certification)
    }

    async find(certification: FindManyOptions<Front>): Promise<Front[]> {
        return await this.frontRepository.find(certification)
    }

    async findByListOfId(idList: number[]) {
        return await this.frontRepository.find({
            where: { id: In(idList) }
        })
    }

    async getFrontOf(id: number[]): Promise<Front[]> {
        try {
            return await this.find({
                where: {
                    menuFrontRl: {
                        menu: {
                            id: Any(id)
                        }
                    }
                },
                relations: {
                    menuFrontRl: {
                        menu: true
                    }
                }
            })
        } catch (error) {
            throw error
        }
    }

    createQueryBuilder(entity: string) {
        return this.frontRepository.createQueryBuilder(entity)
    }

}