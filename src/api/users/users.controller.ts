import { Controller, Get, Post, Put, Delete, Param, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express'
import * as yup from 'yup';

import { UsersService } from './users.service';
import { UserDocument } from './users.schema';

import { ResponseStatus } from '../../common/enums';
import { CommonResponse } from '../../common/interfaces';
import { CreateUserDto, UpdateUserDto } from './users.interface';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(): Promise<UserDocument[]> {
    return this.usersService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string): Promise<UserDocument> {
    return this.usersService.getOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.usersService.create(createUserDto);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<UserDocument> {
    return this.usersService.delete(id);
  }
}
