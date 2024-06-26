import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email:string

    @IsNotEmpty()
    @MinLength(6)
    @IsString()
    @ApiProperty()
    password:string
}
