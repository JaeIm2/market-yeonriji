// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    findAll() {
        return this.prisma.user.findMany();
    }

    findOne(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async create(dto: CreateUserDto) {
        return await this.prisma.user.create({
            data: {
                email: dto.email,
                password: dto.password, // 실제 서비스에선 bcrypt 해싱 필요
            },
        });
    }
}
