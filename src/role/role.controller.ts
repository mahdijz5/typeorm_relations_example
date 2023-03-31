import { JwtGuard } from './../auth/guards/jwt.guard';
import { Query, Body, Controller, Post, UseGuards, Param, Res, Get, Delete, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import {    CreateRoleDto } from 'src/role/dto/createRole.dto';
import { RoleService } from './role.service';
import { RoleEnum } from 'src/utils/enums';
import { UpdateRoleDto } from 'src/role/dto/updateRole.dto';
import { Response } from 'express';

@ApiTags("Role (Should be admin)")
@ApiBearerAuth()
@Controller('role')
export class RoleController {
    constructor(private roleService : RoleService) {}

    @ApiOperation({ summary: 'Create role' })
    @ApiBadRequestResponse({ description: "Role is already exist" })
    @ApiCreatedResponse({ description: 'Role has been created.' })
    @ApiForbiddenResponse({ description: "Your not admin" })
    @Post()
    @Roles(RoleEnum.admin)
    @UseGuards(JwtGuard)
    async create(@Body() body : CreateRoleDto, ) {
        try {
            return await this.roleService.create(body)
        } catch (error) {
            throw error
        }
    }

    @ApiOperation({ summary: 'Edit role' })
    @ApiNotFoundResponse({ description: "Role doesnt exist" })
    @ApiOkResponse({ description: 'Role has been updated.' })
    @ApiForbiddenResponse({ description: "Your not admin" })
    @Put("edit:id")
    @Roles(RoleEnum.admin)
    @UseGuards(JwtGuard)
    async updateRole(@Body() body : UpdateRoleDto,@Param('id') id: number,@Res() res : Response) {
        try {
            await this.roleService.update(body,id)
            res.status(200).json({"message" : "User has been updated"})
        } catch (error) {
            throw error
        }
    }

    @ApiOperation({ summary: 'Remove role' })
    @ApiBadRequestResponse({ description: "Role doesnt exist" })
    @ApiOkResponse({ description: 'Role has been removed.' })
    @ApiForbiddenResponse({ description: "Your not admin" })
    @Delete("remove:id")
    @Roles(RoleEnum.admin)
    @UseGuards(JwtGuard)
    async removeRole(@Param('id') id: number,@Res() res : Response) {
        try {
            await this.roleService.remove(id)
            res.status(200).json({message :"Role has beed deleted."})
        } catch (error) {
            throw error
        }
    }

    @ApiOkResponse()
    @ApiQuery({ name: "limit", type: Number,required : false })
    @ApiQuery({ name: "page", type: Number,required : false })
    @ApiQuery({ name: "search", type: String,required : false })
    @Get("find")
    @Roles(RoleEnum.admin)
    @UseGuards(JwtGuard)
    async search(@Query() query: { limit: number, page: number,search : string }) {
        const limit = query.limit || 10
        const page = query.page || 1
        const search = query.search || ""
        try {
            return await this.roleService.find(limit, page, search)
        } catch (error) {
            throw error
        }
    }
}
