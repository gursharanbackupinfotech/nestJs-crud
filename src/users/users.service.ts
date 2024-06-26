import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export const roundOfHashing = 10;

@Injectable()
export class UsersService {
constructor(private prisma:PrismaService){}

  async create(createUser: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUser.password,roundOfHashing)
    createUser.password = hashedPassword;
    return  this.prisma.user.create({data:createUser});
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({where:{id}});
  }

 async update(id: number, updateUser: UpdateUserDto) {
    if(updateUser.password){
      updateUser.password = await bcrypt.hash(updateUser.password,roundOfHashing)
    }

    return this.prisma.user.update({where:{id},data:updateUser});
  }

  remove(id: number) {
    return this.prisma.user.delete({where:{id}});
  }
}
