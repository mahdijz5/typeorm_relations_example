import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateRoleDto {
    @ApiProperty({
        description : "This is a required property",
        type :String,
        maxLength : 50,
        uniqueItems : true,
    })
    @IsNotEmpty()
    @IsString()
    name : string

    @ApiProperty({
        description : "This is NOT a required property",
        type : [Number],
    })
    @IsOptional()
    @IsArray()
    menusId : number[]
}