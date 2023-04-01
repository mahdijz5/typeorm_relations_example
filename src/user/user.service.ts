import { UserRepository } from './user.repository';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UpdateUserParams } from 'src/utils/types';

@ApiTags("User")
@Injectable()
export class UserService {
    constructor(private userRepository : UserRepository ) {}


    async getUser(id: number) {
        try {
            const user = await this.userRepository.findOne({
                relations : {userRoleRl : {
                    roles : true
                }},
                where : {id}
            })
            if (!user) throw new NotFoundException()

            delete user.password
            return user
        } catch (error) {
            throw error
        }
    }

    async updateUserByAdmin (data : UpdateUserParams,id:number,rolesId : number[]) {
        try {
            return await this.userRepository.updateByAdmin(data,id,rolesId)
        } catch (error) {
            throw error
        }
    }

    async updateUser (data : UpdateUserParams,id :number) {
        try {
            const result =  await this.userRepository.updateUser({id},data)
            if(result.affected <= 0) throw new BadRequestException("User doesn't exist")
        } catch (error) {
            throw error
        }
    }

}
