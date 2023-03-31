import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, } from 'class-validator';

export class UpdateMenuDto {
    @ApiProperty({
        type: String,
        description: "This is a required property",
        maxLength: 150,
        uniqueItems: true,
    })
    @IsNotEmpty()
    @IsString()
    @Length(1, 150)
    name: string

    @ApiProperty({
        type : Number,
        description :"This is NOT a required property",
        required : false,
        default : NaN
    })
    @IsOptional()
    @IsNumber()
    parent: number
}