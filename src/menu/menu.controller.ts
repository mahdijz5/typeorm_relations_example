import { isEmpty } from './../utils/tools';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { Query, Body, Controller, Post, UseGuards, Param, Res, Get, Delete, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { MenuService } from './menu.service';
import { RoleEnum } from 'src/utils/enums';
import { Response } from 'express';
import { CreateMenuDto,UpdateMenuDto } from './dto';


@ApiTags("Menu : (Should be admin)")
@ApiBearerAuth()
@Controller('menu')
export class MenuController {
    constructor(private menuService : MenuService) {}

    @ApiOperation({ summary: 'Create menu | parent id is optional' })
    @ApiBadRequestResponse({ description: "Menu is already exist" })
    @ApiCreatedResponse({ description: 'Menu has been created.' })
    @ApiForbiddenResponse({ description: "Your not admin" })
    @Post("create")
    @Roles(RoleEnum.admin)
    @UseGuards(JwtGuard)
    async create(@Body() body : CreateMenuDto ) {
        try {
            if(isEmpty(body.parent)) {
                return await this.menuService.create({name : body.name})
            }else {
                return await this.menuService.createChildren({name : body.name},body.parent)
            }
        } catch (error) {
            throw error
        }
    }


    @ApiOperation({ summary: 'Edit menu -- (You can add front HERE)' })
    @ApiNotFoundResponse({ description: "Role doesnt exist" })
    @ApiOkResponse({ description: 'Menu has been updated.' })
    @ApiForbiddenResponse({ description: "Your not admin" })
    @Put("edit/:id")
    @Roles(RoleEnum.admin)
    @UseGuards(JwtGuard)
    async updateMenu(@Body() body : UpdateMenuDto,@Param('id') id: number,@Res() res : Response) {
        try {
            await this.menuService.update(body,id)
            res.status(200).json({"message" : "User has been updated"})
        } catch (error) {
            throw error
        }
    }

    @ApiOperation({ summary: 'Remove menu' })
    @ApiBadRequestResponse({ description: "Menu doesnt exist" })
    @ApiOkResponse({ description: 'Menu has been removed.' })
    @ApiForbiddenResponse({ description: "Your not admin" })
    @Delete("remove/:id")
    @Roles(RoleEnum.admin)
    @UseGuards(JwtGuard)
    async removeMenu(@Param('id') id: number,@Res() res : Response) {
        try {
            await this.menuService.remove(id)
            res.status(200).json({message :"Menu has beed deleted."})
        } catch (error) {
            throw error
        }
    }

    @ApiOperation({ summary: 'Searching menus' })
    @ApiOkResponse()
    @ApiQuery({ name: "limit", type: Number,required : false })
    @ApiQuery({ name: "page", type: Number,required : false })
    @ApiQuery({ name: "search", type: String,required : false })
    @Get("search")
    @Roles(RoleEnum.admin)
    @UseGuards(JwtGuard)
    async search(@Query() query: { limit: number, page: number,search : string }) {
        const limit = query.limit || 10
        const page = query.page || 1
        const search = query.search || ""
        try {
            return await this.menuService.find(limit, page, search)
        } catch (error) {
            throw error
        }
    }
    @ApiOperation({ summary: 'Get menus in tree form' })
    @ApiOkResponse()
    @Get("findTree")
    @Roles(RoleEnum.admin)
    @UseGuards(JwtGuard)
    async findTree(@Query() query: { limit: number, page: number,search : string }) {
        try {
            return await this.menuService.findTree()
        } catch (error) {
            throw error
        }
    }
}
