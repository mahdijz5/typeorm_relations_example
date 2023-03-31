import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, } from 'class-validator';
export class CreateFrontDto {
    @ApiProperty({
        type : String,
        description :"This is a required property",
        maxLength : 150,
        uniqueItems:true,
    })
    @IsNotEmpty()
    @IsString()
    @Length(1,150)
    name : string

    @ApiProperty({
        type : String,
        description :"This is a required property",
        maxLength : 400,
    })
    @IsNotEmpty()
    @IsString()
    @Length(1,400)
    description : string
}