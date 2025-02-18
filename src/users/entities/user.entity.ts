import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserEntity implements User {
    constructor(partialUser: Partial<UserEntity>){
        Object.assign(this, partialUser)
    }

    @ApiProperty()
    id: number;
  
    @ApiProperty()
    createdAt: Date;
  
    @ApiProperty()
    updatedAt: Date;
  
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    email: string;
    
    @Exclude()
    password: string;

}
