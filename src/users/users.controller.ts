import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGaurd } from 'src/auth/jwt-auth.gaurd';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({type:UserEntity})
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.usersService.create(createUserDto));
  }

  @Get()
  @ApiOkResponse({type:UserEntity,isArray:true})
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth()
  async findAll() {
    const users =  await this.usersService.findAll()
    return users.map((user)=> new UserEntity(user));
  }

  @Get(':id')
  @ApiOkResponse({type:UserEntity})
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.usersService.findOne(id));
  }

  @Patch(':id')
  @ApiOkResponse({type:UserEntity})
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth()
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return new UserEntity(await this.usersService.update(id, updateUserDto));
  }

  @Delete(':id')
  @ApiOkResponse({type:UserEntity})
  @UseGuards(JwtAuthGaurd)
  @ApiBearerAuth()
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.usersService.remove(id));
  }
}
