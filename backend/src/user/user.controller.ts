// src/user/user.controller.ts
import { Controller, Get, Post, Param, ParseIntPipe, Body, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOkResponse({ description: '유저 목록 반환' })
    getAll() {
        return this.userService.findAll();
    }

    @Post()
    @ApiCreatedResponse({ description: '유저 생성됨' })
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Get(':id')
    @ApiOkResponse({ description: '특정 유저 반환' })
    @ApiNotFoundResponse({ description: '해당 유저가 존재하지 않음' })
    async getById(@Param('id', ParseIntPipe) id: number) {
        const user = await this.userService.findOne(id);
        if (!user) throw new NotFoundException('해당 유저가 없습니다.');
        return user;
    }
}
