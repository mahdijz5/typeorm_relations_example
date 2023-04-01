import { RoleRepository } from 'src/role/role.repository';
import { isEmpty } from './../utils/tools';
import { UserRoleRepository } from 'src/user/user.role.repository';
import { BadRequestException } from '@nestjs/common';
import { DeepPartial, FindOneOptions, FindOptionsWhere, FindOptionsWhereProperty, Like, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { RoleEnum } from 'src/utils/enums';
import { UserRoleRl } from './entities/userRoleRl.entity';

@Injectable()
export class UserRepository {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, private userRoleRepository: UserRoleRepository,private roleRepository :RoleRepository) { }

    create(data: DeepPartial<User>) {
        const user = this.userRepository.create(data)
        return user
    }

    async findOneBy(certificate: FindOptionsWhere<User>) {
        return await this.userRepository.findOneBy(certificate)
    }

    async findOne(certificate: FindOneOptions<User>) {
        return await this.userRepository.findOne(certificate)
    }

    async updatePassword(certificate: object, password: string) {
        const user = await this.userRepository.findOneBy(certificate)
        user.password = password
        return await this.userRepository.save(user)
    }

    async provideRelationForUser(userId : number): Promise<{user: User , userRole : UserRoleRl}> {
        try {
            let userRole:UserRoleRl;
            const user = await this.findOne({
                where : { id : userId },
                relations : {userRoleRl:{
                    roles : true

                }}
            })
            if (!user) throw new BadRequestException("User doesn't exist")

            if(isEmpty(user.userRoleRl)) {
                userRole = this.userRoleRepository.create({})
                userRole.user = user
                this.userRoleRepository.save(userRole)
            }else {
                userRole = user.userRoleRl
            } 

            return {userRole, user}
        } catch (error) {
            throw error
        }
    }

    async updateUser(certification : FindOptionsWhere<User>,data : DeepPartial<User>): Promise<{affected?: number}> {
        if(isEmpty(data.email) && isEmpty(data.username)) return {affected : 0}

        const isExist = await this.userRepository.findOneBy({ username: data.username || "" })
        if (isExist) throw new BadRequestException("User already exists")

        return await this.userRepository.update(certification,data)
    }

    async updateByAdmin(data: DeepPartial<User>, id: number, rolesId: number[] = []) {
        try {
            const {user,userRole} =await this.provideRelationForUser(id)
            await this.updateUser({id},data)

            if (rolesId.length > 0) {
                userRole.roles = [...await this.roleRepository.findByListOfId(rolesId)]
                this.userRoleRepository.save(userRole)
            }

            return user
        } catch (error) {
            throw error
        }
    }


    async search(limit: number, page: number, searchQuery: string): Promise<User[]> {
        const query = `%${searchQuery}%`
        return await this.userRepository.find({
            where: { username: Like(query) },
            relations: {
                userRoleRl: {
                    roles: true
                }
            },
            take: limit,
            skip: (page - 1) * limit
        })
    }

    async remove(user: User) {
        return await this.userRepository.remove(user)
    }

    async save(user: User) {
        return await this.userRepository.save(user)
    }

}
