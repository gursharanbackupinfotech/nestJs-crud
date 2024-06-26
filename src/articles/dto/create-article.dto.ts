import { ApiProperty } from "@nestjs/swagger";
import {IsString,IsBoolean,IsNotEmpty,IsOptional,MaxLength,MinLength} from 'class-validator';

export class CreateArticleDto {
    
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty()
    title: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @MaxLength(300)
    @ApiProperty({required:false})
    description?: string;  

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    body: string ; 

    @IsOptional()
    @IsBoolean()
    @ApiProperty({required:false,default:false})
    published: boolean = false;   
  
}

