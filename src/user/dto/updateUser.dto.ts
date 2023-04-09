import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString,IsEmail, Length, IsOptional, IsArray } from "class-validator"

export class UpdateUserDto {
    @ApiProperty({
        type: String,
        description: 'This is NOT a required property',
        maxLength : 150,
        required : false,
    })
    @IsOptional()
    @IsEmail()
    @Length(0, 150)
    email : string

    @ApiProperty({
        type: String,
        description: 'This is NOT a required property',
        maxLength:150,
        required : false,
    })
    @IsOptional()
    @IsString()
    @Length(0, 150)
    username : string
}