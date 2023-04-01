import { BadRequestException, SetMetadata } from '@nestjs/common';
import { isAdmin, isEmpty } from './../utils/tools';
import { UserData } from './../decorators/userData.decorator';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { UserService } from './user.service';
import {ForbiddenException,Query, Inject, Controller, Get, Param, ParseIntPipe, UseGuards, Post, Body, Req, Put, Delete, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiBearerAuth, ApiOperation, ApiForbiddenResponse, ApiQuery } from '@nestjs/swagger';
import {  UpdateUserByAdminDto, UpdateUserDto } from './dto';
import { ProvidersEnum, RoleEnum } from '../utils/enums';
import UserDataInterface from '../interfaces/userData.interface';
import { Roles } from 'src/decorators/role.decorator';
import { UpdateRoleDto } from 'src/role/dto/updateRole.dto';
import { Response } from 'express';
import Role from 'src/role/entities/role.entity';
import { RolesGuard } from 'src/auth/guards/role.guard';


@ApiTags("User")
@Controller('user')
@ApiBearerAuth()
export class UserController {
    constructor(@Inject(ProvidersEnum.uesrService) private userService : UserService) {}


    @ApiOperation({ summary: "Get user by id" })
    @ApiOkResponse()
    @ApiNotFoundResponse({ description: "User doesnt exist." })
    @Roles(RoleEnum.admin)
    @Get(":id")
    async getUser(@Param("id", ParseIntPipe) id: number) {
        try {
            return await this.userService.getUser(id)
        } catch (error) {
            throw error
        }
    }

    @Roles(RoleEnum.admin)
    @ApiOperation({ summary: 'Edit User and you can set roles here  : (Should be admin)' })
    @ApiBadRequestResponse({ description: "User doesnt exist" })
    @ApiOkResponse({ description: 'User has been updated.' })
    @ApiForbiddenResponse({ description: "Your not admin" })
    @UseGuards(JwtGuard)
    @Put("edit-by-admin/:id")
    async updateUserByAdmin(@Body() body : UpdateUserByAdminDto,@Param('id') id: number,@Res() res : Response) {
        try {
            const {email,username,rolesId} = body
            await this.userService.updateUserByAdmin({username,email},id,rolesId)
            res.status(200).json({"message" : "User has been updated"})
        } catch (error) {
            throw error
        }
    }

    @ApiOperation({ summary: 'Edit User : (you can set roles here)' })
    @ApiBadRequestResponse({ description: "because of not exsting user or no data" })
    @ApiOkResponse({ description: 'User has been updated.' })
    @ApiForbiddenResponse({ description: "Your not admin" })
    @Put("edit")
    @UseGuards(JwtGuard)
    async updateUser(@Body() body : UpdateUserDto,@Res() res : Response,@UserData() user : UserDataInterface) {
        try {
            if(isEmpty(body)) throw new BadRequestException("No value entred.")
            await this.userService.updateUser(body,user.id)
            res.status(200).json({"message" : "User has been updated"})
        } catch (error) {
            throw error
        }
    }

    @ApiOperation({ summary: 'Remove role' })
    @ApiBadRequestResponse({ description: "User doesnt exist" })
    @ApiOkResponse({ description: 'User has been removed.' })
    @ApiForbiddenResponse({ description: "Your not admin" })
    @Delete("remove/:id")
    @Roles(RoleEnum.admin)
    @UseGuards(JwtGuard)
    async removeRole(@Param('id') id: number,@Res() res : Response) {
        try {
            res.status(200).json({message :"User has beed deleted."})
        } catch (error) {
            throw error
        }
    }

    @ApiOkResponse()
    @ApiForbiddenResponse()
    @ApiQuery({ name: "limit", type: Number,required : false })
    @ApiQuery({ name: "page", type: Number,required : false })
    @ApiQuery({ name: "search", type: String,required : false })
    @Roles(RoleEnum.admin)
    @Get("find")
    @UseGuards(JwtGuard)
    async search(@Query() query: { limit: number, page: number,search : string }) {
        const limit = query.limit || 10
        const page = query.page || 1
        const search = query.search || ""
        try {
            return await this.userService.find(limit, page, search)
        } catch (error) {
            throw error
        }
    }

    @ApiOperation({ summary: "get user's roles" })
    @ApiOkResponse({ description: 'User has been removed.' })
    @ApiForbiddenResponse({ description: "Your not admin" })
    @Get("roles/:id")
    @UseGuards(JwtGuard)
    async getRoles(@Param('id') id: number,@Res() res : Response,@UserData() user : UserDataInterface) {
        try {
            if(user.id !== id && !isAdmin(user)) throw new ForbiddenException()
            res.status(200).json(await this.userService.getRoles([id]))
        } catch (error) {
            throw error
        }
    }

    @ApiOperation({ summary: "get user's menus" })
    @ApiOkResponse({ description: 'User has been removed.' })
    @ApiForbiddenResponse({ description: "Your not admin" })
    @Get("menus/:id")
    @UseGuards(JwtGuard)
    async getMenus(@Param('id') id: number,@Res() res : Response,@UserData() user : UserDataInterface) {
        try {
            if(user.id !== id && !isAdmin(user)) throw new ForbiddenException()
            res.status(200).json(await this.userService.getMenus([id]))
        } catch (error) {
            throw error
        }
    }

    @ApiOperation({ summary: "get user's fronts" })
    @ApiOkResponse({ description: 'User has been removed.' })
    @ApiForbiddenResponse({ description: "Your not admin" })
    @Get("fronts/:id")
    @UseGuards(JwtGuard)
    async getFronts(@Param('id') id: number,@Res() res : Response,@UserData() user : UserDataInterface) {
        try {
            if(user.id !== id && !isAdmin(user)) throw new ForbiddenException()
            res.status(200).json(await this.userService.getFronts([id]))
        } catch (error) {
            throw error
        }
    }

}
