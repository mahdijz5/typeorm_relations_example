import { CreateFrontDto, UpdateFrontDto } from './dto';
import { Roles } from './../decorators/role.decorator';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import {Query, Controller, Post, UseGuards, Body, Param, Res, Get, Delete, Put } from '@nestjs/common';
import { FrontService } from './front.service';
import { RoleEnum } from 'src/utils/enums';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Response } from 'express';

@ApiTags("Front : (Should be admin)")
@ApiBearerAuth()
@Controller('front')
export class FrontController {
    constructor(private frontService : FrontService) {}

    @ApiOperation({ summary: 'Create front' })
    @ApiBadRequestResponse({ description: "Front is already exist" })
    @ApiCreatedResponse({ description: 'Front has been created.' })
    @ApiForbiddenResponse({ description: "Your not admin" })
    @Post()
    @Roles(RoleEnum.admin)
    @UseGuards(JwtGuard)
    async create(@Body() body : CreateFrontDto, ) {
        try {
            return await this.frontService.create(body)
        } catch (error) {
            throw error
        }
    }

    @ApiOperation({ summary: 'Edit front' })
    @ApiNotFoundResponse({ description: "Front doesnt exist" })
    @ApiOkResponse({ description: 'Front has been updated.' })
    @ApiForbiddenResponse({ description: "Your not admin" })
    @Put("edit:id")
    @Roles(RoleEnum.admin)
    @UseGuards(JwtGuard)
    async updateFront(@Body() body : UpdateFrontDto,@Param('id') id: number,@Res() res : Response) {
        try {
            await this.frontService.update(body,id)
            res.status(200).json({"message" : "User has been updated"})
        } catch (error) {
            throw error
        }
    }

    @ApiOperation({ summary: 'Remove front' })
    @ApiBadRequestResponse({ description: "Front doesnt exist" })
    @ApiOkResponse({ description: 'Front has been removed.' })
    @ApiForbiddenResponse({ description: "Your not admin" })
    @Delete("remove:id")
    @Roles(RoleEnum.admin)
    @UseGuards(JwtGuard)
    async removeFront(@Param('id') id: number,@Res() res : Response) {
        try {
            await this.frontService.remove(id)
            res.status(200).json({message :"Front has beed deleted."})
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
            return await this.frontService.find(limit, page, search)
        } catch (error) {
            throw error
        }
    }
}
