import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import {  DeepPartial, DeleteResult, FindOptionsWhere, Repository, UpdateResult } from "typeorm";
import Role from "./entities/role.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RoleRepository {
    constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {}
    


    create(data:DeepPartial<Role>) : Role {
        return this.roleRepository.create(data)
    }

    async update(data:DeepPartial<Role>,id:number) : Promise<UpdateResult> {
        const result =await this.roleRepository.update({id},data)
        if(result.affected === 0) {throw new BadRequestException("Role doesn't exist")}
        return result
    }

    async remove(id:number) : Promise<DeleteResult> {
        const result = await this.roleRepository.delete({id})
        if(result.affected === 0) {throw new BadRequestException("Role doesn't exist")}
        return result
    }

    async save(role:Role) {
        return await this.roleRepository.save(role)
    }

    async findOneBy(certification:FindOptionsWhere<Role>) : Promise<Role> {
        return await this.roleRepository.findOneBy(certification)
    }

    createQueryBuilder(entity:string) {
        return this.roleRepository.createQueryBuilder(entity)
    }
    
}