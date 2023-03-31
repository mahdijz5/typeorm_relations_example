import { Injectable } from '@nestjs/common';
import {  DeepPartial, FindOptionsWhere, Repository, UpdateResult } from "typeorm";
import Role from "./entities/role.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RoleRepository {
    constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {}
    


    create(data:DeepPartial<Role>) : Role {
        return this.roleRepository.create(data)
    }

    async update(data:DeepPartial<Role>,id:number) : Promise<UpdateResult> {
        return await this.roleRepository.update({id},data)
    }

    async remove(id:number) : Promise<void> {
        await this.roleRepository.delete({id})
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