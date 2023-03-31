import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({
        description : "This is a required property",
        type :String,
        maxLength : 50,
        uniqueItems : true,
    })
    @IsNotEmpty()
    @IsString()
    name : string
    
}