import { Controller, Get, Post, Put, Delete, Param, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express'
import * as yup from 'yup'; 

import { OrganizationsService } from '../organizations/organizations.service';
import { MembersService } from './members.service';
import { MemberDocument } from './members.schema';

import { ResponseStatus, UserRole } from '../../common/enums';
import { CommonResponse } from '../../common/interfaces';
import { CreateMemberDto, UpdateMemberDto } from './members.interface';
import { UserDocument } from '../users/users.schema';


@Controller('api/members')
export class MembersController {
  constructor(
    private readonly organizationsService: OrganizationsService,
    private readonly membersService: MembersService
  ) {}

  @Get()
  async getAll() {
    return await this.membersService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.membersService.getOne(id);
  }

  // @Post()
  // async create(@Param('id') id: string, @Body() createMemberDto: CreateMemberDto) {
  //   return await this.membersService.create(createMemberDto);
  // }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return await this.membersService.update(id, updateMemberDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.membersService.delete(id);
  }
  
}
