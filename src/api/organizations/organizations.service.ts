import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserRole } from '../../common/enums';

import { Organization, OrganizationDocument } from './organizations.schema';
import { UsersService } from '../users/users.service';
import { CreateOrganizationDto, UpdateOrganizationDto, JoinDto } from './organizations.interface';
import { UserDocument } from '../users/users.schema';

@Injectable()
export class OrganizationsService {

  constructor(
    @InjectModel(Organization.name) private organizationModel: Model<OrganizationDocument>,
    private userService: UsersService
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto): Promise<OrganizationDocument> {
    const organization: OrganizationDocument = await new this.organizationModel(createOrganizationDto).save()
    return organization;
  }

  async getAll(): Promise<OrganizationDocument[]> {
    return this.organizationModel.find();
  }

  async getOne(id: string): Promise<OrganizationDocument> {
    return this.organizationModel.findById(id);
  }

  // async getUsersOfOrganization(id: string): Promise<UserDocument[]> {
  //   const org = await this.getOrganization(id);
  //   return await this.userService.getUsersByIds(org.members);
  // }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<OrganizationDocument> {
    await this.organizationModel.findByIdAndUpdate(id, updateOrganizationDto);
    return await this.getOne(id);
  }

  async delete(id: string): Promise<OrganizationDocument> {
    return this.organizationModel.findByIdAndDelete(id)
  }

  // async joinToOrganization(joinDto: JoinDto) {
  //   const doc = await this.getOrganization(joinDto.organizationId);
  //   doc.members[joinDto.uid] = UserRole.PENDING;
  //   doc.markModified('members');
  //   doc.save();
  //   return doc;
  // }

  // async cancelJoinToOrganization(joinDto: JoinDto) {
  //   try {
  //     const doc = await this.getOrganization(joinDto.organizationId);
  //     if (joinDto.uid in doc.members) {
  //       delete doc.members[joinDto.uid]
  //       doc.markModified('members');
  //       doc.save();
  //     }
  //     return doc;
  //   } catch (error) {
  //     return error
  //   }
  // }
}
