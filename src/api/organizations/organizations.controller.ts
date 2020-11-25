import { Controller, Get, Post, Put, Delete, Param, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express'
import * as yup from 'yup'; 

import { OrganizationsService } from './organizations.service';
import { UsersService } from '../users/users.service';
import { MembersService } from '../members/members.service';
import { OrganizationDocument } from './organizations.schema';

import { ResponseStatus, UserRole } from '../../common/enums';
import { CommonResponse } from '../../common/interfaces';
import { CreateOrganizationDto, UpdateOrganizationDto, JoinDto } from './organizations.interface';
import { UserDocument } from '../users/users.schema';
import { CreateMemberDto } from '../members/members.interface';



@Controller('api/organizations')
export class OrganizationsController {
  constructor(
    private readonly organizationsService: OrganizationsService,
    private readonly membersService: MembersService,
    private readonly usersService: UsersService
  ) {}

  @Get()
  async getAll(): Promise<OrganizationDocument[]> {
    return await this.organizationsService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<OrganizationDocument> {
    return await this.organizationsService.getOne(id);
  }

  // @Post()
  // async createOrganization(
  //   @Req() req,
  //   @Res() res: Response<OrganizationDocument>,
  //   @Body() createOrganizationDto: CreateOrganizationDto
  // ): Promise<Response<OrganizationDocument>> {
  //   if (req.user !== null) {
  //     const org = {
  //       ...createOrganizationDto,
  //       // members: {
  //       //   [req.user.uid]: 'admin'
  //       // }
  //     };
  //     const doc = await this.organizationsService.createOrganization(org);
  //     return res.send(doc);
  //   } else {
  //     return res.status(HttpStatus.UNAUTHORIZED).send()
  //   }
  // }

  @Post()
  async create(
    @Req() req,
    @Res() res: Response<OrganizationDocument>,
    @Body() createOrganizationDto: CreateOrganizationDto
  ): Promise<OrganizationDocument> {
    const { user } = req;
    if (user !== null) {
      // Create organization
      const organization: OrganizationDocument = await this.organizationsService.create(createOrganizationDto);

      // Create member with admin role
      const userDocument: UserDocument = await this.usersService.getOne(user.uid);
      const { firstName, middleName, lastName } = userDocument;
      const member = await this.membersService.create({
        firstName,
        middleName,
        lastName,
        organization: organization._id,
        role: UserRole.ADMIN
      });
      return res.send(organization);
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).send()
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto) {
    return await this.organizationsService.update(id, updateOrganizationDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<OrganizationDocument> {
    return await this.organizationsService.delete(id);
  }

  @Get(':id/members')
  async getMembers(@Param('id') id: string): Promise<OrganizationDocument> {
    return await this.membersService.getOrganizationMembers(id);
  }

  @Post(':id/members')
  async createMember(@Param('id') id: string, @Body() createMemberDto: CreateMemberDto): Promise<OrganizationDocument> {
    createMemberDto.organization = id;
    return await this.membersService.create(createMemberDto);
  }

  // @Get('/:id/users')
  // async getUsersOfOrganization(@Param('id') id: string): Promise<UserDocument[]> {
  //   const organizationId = id;
  //   return await this.organizationsService.getUsersOfOrganization(organizationId);
  // }

  // @Post('/:id/users')
  // async createUserForOrganization(@Param('id') id: string): Promise<CommonResponse> {
  //   const organizationId = id;
  //   try {
  //     const organization = await this.organizationsService.getOrganization(organizationId);
  //     const user = await this.usersService.createUser({firstName: '', middlename: ''});
  //     console.log('organization', organization)
  //     console.log('user', user)
  //     organization.members[user._id] = UserRole.PENDING;
  //     console.log('organization', organization)
  //     organization.markModified('members');
  //     await organization.save();
  //     return {
  //       status: ResponseStatus.SUCCESS
  //     }
  //   } catch(error) {
  //     return {
  //       status: ResponseStatus.ERROR,
  //       error
  //     }
  //   }
  // }

  // @Delete('/:id/users/:userId')
  // async deleteUserFromOrganization(@Param() params): Promise<CommonResponse> {
  //   const joinDto: JoinDto = {
  //     organizationId: params.id,
  //     uid: params.userId
  //   }
  //   try {
  //     await this.organizationsService.cancelJoinToOrganization(joinDto)
  //     const user = await this.usersService.findOne(joinDto.uid);
  //     if (!user.isReal) {
  //       await this.usersService.deleteUser(joinDto.uid);
  //     }
  //     return {
  //       status: ResponseStatus.SUCCESS
  //     }
  //   } catch(error) {
  //     return {
  //       status: ResponseStatus.ERROR,
  //       error
  //     }
  //   }
  // }

  // @Get()
  // getAll(): Promise<OrganizationDocument[]> {
  //   return this.organizationsService.getOrganizations();
  // }

  // @Get('/:id')
  // getOne(@Param('id') id: string): Promise<OrganizationDocument> {
  //   return this.organizationsService.getOrganization(id);
  // }
  
  // @Post('/:id/join')
  // async joinToOrganization(@Req() req, @Res() res, @Param('id') id: string): Promise<Response<CommonResponse>> {
  //   const joinDto: JoinDto = {
  //     organizationId: id,
  //     uid: req.user.uid
  //   }

  //   const schema = yup.object().shape({
  //     organizationId: yup.string().required().min(24),
  //     uid: yup.string().required().min(24),
  //   });

  //   try {
  //     await schema.validate(joinDto);
  //     await this.organizationsService.joinToOrganization(joinDto);

  //     return res.send({ status: ResponseStatus.SUCCESS });
  //   } catch (error) {
  //     return res.send({
  //       status: ResponseStatus.ERROR,
  //       error
  //     });
  //   }
  // }
  // @Delete('/:id/join')
  // async cancelJoinToOrganization(@Req() req, @Res() res, @Param('id') id: string): Promise<CommonResponse> {
  //   const joinDto: JoinDto = {
  //     organizationId: id,
  //     uid: req.user.uid
  //   }

  //   const schema = yup.object().shape({
  //     organizationId: yup.string().required().min(24),
  //     uid: yup.string().required().min(24),
  //   });

  //   try {
  //     await schema.validate(joinDto);
  //     await this.organizationsService.cancelJoinToOrganization(joinDto);

  //     return res.send({ status: ResponseStatus.SUCCESS });
  //   } catch (error) {
  //     return res.send({
  //       status: ResponseStatus.ERROR,
  //       error
  //     });
  //   }
  // }

  // @Post()
  // async createOrganization(
  //   @Req() req,
  //   @Res() res: Response<OrganizationDocument>,
  //   @Body() createOrganizationDto: CreateOrganizationDto
  // ): Promise<Response<OrganizationDocument>> {
  //   if (req.user !== null) {
  //     const org = {
  //       ...createOrganizationDto,
  //       // members: {
  //       //   [req.user.uid]: 'admin'
  //       // }
  //     };
  //     const doc = await this.organizationsService.createOrganization(org);
  //     return res.send(doc);
  //   } else {
  //     return res.status(HttpStatus.UNAUTHORIZED).send()
  //   }
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto) {
  //   return this.organizationsService.update(id, updateOrganizationDto);
  // }

  // @Delete(':id')
  // delete(@Param('id') id: string): Promise<OrganizationDocument> {
  //   return this.organizationsService.delete(id);
  // }
}
