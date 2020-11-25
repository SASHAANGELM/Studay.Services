import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { CreateUserDto, UpdateUserDto } from './users.interface';
import { Members } from '../organizations/organizations.interface';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private usersModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    try {
      return await new this.usersModel(createUserDto).save();
    } catch(error) {
      console.log('error', error);
    }
  }

  async getAll(): Promise<UserDocument[]> {
    return this.usersModel.find();
  }

  async getOne(id: string): Promise<UserDocument> {
    return this.usersModel.findById(id);
  }

  // async getUsersByUid(uid) {
  //   return await this.usersModel.findOne({
  //     uid
  //   });
  // }

  // async getUsersByIds(members: Members) {
  //   const ids = Object.keys(members);
  //   const docs = await this.usersModel.find({
  //     '_id': { $in: ids}
  //   });
  //   const users = [];

  //   docs.forEach(doc => {
  //     const user = {
  //       user: doc,
  //       role: members[doc._id]
  //     }
  //     users.push(user);
  //   })
  //   return users;
  // }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    await this.usersModel.findByIdAndUpdate(id, updateUserDto);
    return await this.getOne(id);
  }

  async delete(id: string): Promise<UserDocument> {
    return this.usersModel.findByIdAndDelete(id)
  }
}
