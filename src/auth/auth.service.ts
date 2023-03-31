import { UserRoleRepository } from './../user/user.role.repository';
import UserDataInterface  from '../interfaces/userData.interface';
import { UserRepository } from './../user/user.repository';
import { CreateUserParams, ResetPasswordParams } from './../utils/types';
import { BadRequestException, Injectable,UnauthorizedException } from '@nestjs/common';
import {compare} from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
@Injectable()
export class AuthService {
    constructor( private userRepository: UserRepository,private userRoleRepository: UserRoleRepository, private jwtService: JwtService) { }

    async createUser(data: CreateUserParams) {
        try {
            const user = await this.userRepository.findOneBy({ email: data.email })
            if (user) throw new BadRequestException({ "message": "This User already exists." })

            const newUser = await this.userRepository.create({ ...data, password: data.password })
            const userRole = await this.userRoleRepository.JoinUserAndRole(newUser)
            
            await this.userRepository.save(newUser)
            await this.userRoleRepository.save(userRole)

            return {username : newUser.username,email : newUser.email,role : 'user'};
        } catch (error) {
            throw error
        }
    }

    async validateRefreshToken(token : string) {
        try {
            const decoded = await this.jwtService.verifyAsync(token, { secret: process.env.REFRESH_TOKEN_SECRET }) 
            return this.generateToken(decoded)
        } catch (error) {
            throw new UnauthorizedException()
        }
    }

    async sendMail(token : string){
        try {
            let response;
            const decoded = await this.validateRefreshToken(token)
            return {message : "its supposed to send this email to user"}
        } catch (error) {
            throw error
        }
    }

    generateToken(user : UserDataInterface) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                username: user.username,
                email: user.email,
                roles : user.userRoleRl?.roles
            }, { secret: process.env.ACCESS_TOKRN_SECRET }),
            refreshToken: this.jwtService.sign({
                id: user.id,
                username: user.username,
                email: user.email,
                roles : user.userRoleRl?.roles
            },
                { secret: process.env.REFRESH_TOKEN_SECRET })
        }
    }

    async validate(email :string, password : string) {
        try {
            const user = await this.userRepository.findOne({
                relations : {userRoleRl : {
                    roles : true
                }},
                where: {
                    email : email
                }
            })
            if (!user) throw new BadRequestException({ "message": "This User doesn't exists." })
            
            if (!await compare(password, user.password)) throw new UnauthorizedException()
            return user
        } catch (error) {
            throw error
        }
    }

    async validateEmailToChangePassword({email}:{email :string}) {
        try {
            const user = await this.userRepository.findOneBy({email})
            if (!user) throw new UnauthorizedException({ "message": "This User doesn't exists." })

            const token = await this.jwtService.signAsync({
                email: user.email,
                id: user.id,
            }, { secret: process.env.RESET_PASSWORD_TOKEN_SECRET })
            
            return { "message": "its supposed to send this link ", "link": `${process.env.SERVER_URL}/user/reset-password/${token}`}
        } catch (error) {
            throw error
        }
    }

    async HandleResettingPassword(token :string,body : ResetPasswordParams) {
        try {
            const decodedToken = await this.jwtService.verifyAsync(token, { secret: process.env.RESET_PASSWORD_TOKEN_SECRET }) 
            if(body.password !== body.confirmPassword) {throw new UnauthorizedException()}
            return await this.userRepository.updatePassword({id : decodedToken.id}, body.password)
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException()
        }
    }
}
