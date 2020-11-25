import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserRole } from '../../common/enums';

import { Member, MemberDocument } from './members.schema';
import { UsersService } from '../users/users.service';
import { CreateMemberDto, UpdateMemberDto } from './members.interface';
import { UserDocument } from '../users/users.schema';

@Injectable()
export class MembersService {

  constructor(
    @InjectModel(Member.name) private memberModel: Model<MemberDocument>,
    private userService: UsersService
  ) {}

  public async getAll(): Promise<MemberDocument[]> {
    return await this.memberModel.find();
  }

  public async getOne(id: string): Promise<MemberDocument> {
    return await this.memberModel.findById(id);
  }

  public async getOrganizationMembers(organizationId: string) {
    return await this.memberModel.find({
      organization: organizationId
    });
  }

  public async create(createMemberDto: CreateMemberDto): Promise<MemberDocument> {
    return await this.memberModel(createMemberDto).save();
  }

  public async update(id: string, updateMemberDto: UpdateMemberDto): Promise<MemberDocument> {
    await this.memberModel.findByIdAndUpdate(id, updateMemberDto);
    return await this.getOne(id);
  }

  public async delete(id): Promise<MemberDocument> {
    return await this.memberModel.findByIdAndDelete(id);
  }
  
}
