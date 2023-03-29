import { UserData } from './../decorators/userData.decorator';
import { JwtGuard } from './../auth/guards/jwt.guard';
import { UserService } from './user.service';
import {Inject, Controller, Get, Param, ParseIntPipe, UseGuards, Post, Body, Req, Put, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreatePostDto, UpdatePostDto } from './dto';
import { ProvidersEnum } from '../utils/enums';
import UserDataInterface from 'src/interface.ts/userData.interface';


@ApiTags("User")
@Controller('user')
@ApiBearerAuth()
export class UserController {
    constructor(@Inject(ProvidersEnum.uesrService) private userService : UserService) {}

    @ApiCreatedResponse({description :"Post has been created."})
    @ApiBadRequestResponse({ description: "User doesnt exist." })
    @ApiOperation({ summary: 'Create new post' })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtGuard)
    @Post("/post")
    async addNewPost(@Body() body : CreatePostDto,@UserData() user : UserDataInterface){
        try {
            return await this.userService.createPost({...body,userId :user.id})
        } catch (error) {
            throw error
        }
    }

    @ApiOkResponse()
    @ApiOperation({ summary: "Get All user's posts" })
    @ApiBadRequestResponse({ description: "User doesnt exist." })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtGuard)
    @Get("/posts")
    async getPosts(@UserData() user : UserDataInterface){
        try {
            return await this.userService.getUserPosts(user.id)
        } catch (error) {
            throw error
        }
    }

    @ApiOperation({ summary: "Get user by id" })
    @ApiOkResponse()
    @ApiNotFoundResponse({ description: "User doesnt exist." })
    @Get(":id")
    async getUser(@Param("id", ParseIntPipe) id: number) {
        try {
            return await this.userService.getUser(id)
        } catch (error) {
            throw error
        }
    }

    @ApiOperation({ summary: "It lets user edit his own info" })
    @ApiOkResponse()
    @ApiNotFoundResponse({ description: "User doesnt exist." })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtGuard)
    @Put("post/:id")
    async updateUser(@Param("id", ParseIntPipe) id: number, @Body() body: UpdatePostDto,@UserData() user : UserDataInterface) {
        try {
            return await this.userService.updatePost(user.id,{...body,id})
        } catch (error) {
            throw error
        }
    }

    @ApiOperation({ summary: "It lets user delete his own post" })
    @ApiOkResponse()
    @ApiNotFoundResponse({ description: "User doesnt exist." })
    @ApiUnauthorizedResponse()
    @UseGuards(JwtGuard)
    @Delete("post/:id")
    async deletePost(@Param("id", ParseIntPipe) id: number, @UserData() user: any) {
        try {
            return await this.userService.removePost(user.id,id)
        } catch (error) {
            throw error
        }
    }

}
