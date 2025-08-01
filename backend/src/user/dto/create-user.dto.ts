// src/user/dto/create-user.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'test@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'securepassword' })
    @IsString()
    @MinLength(6)
    password: string;
}
