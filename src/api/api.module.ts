import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User, UserSchema } from './users/users.schema';

import { OrganizationsController } from './organizations/organizations.controller';
import { OrganizationsService } from './organizations/organizations.service';
import { Organization, OrganizationSchema } from './organizations/organizations.schema';

import { MembersController } from './members/members.controller';
import { MembersService } from './members/members.service';
import { Member, MemberSchema } from './members/members.schema';

interface MongooseModulesSetupObject {
  name: string;
  schema: mongoose.Schema
}

function importMongooseModules(array: MongooseModulesSetupObject[]) {
  return array.map((item) => {
    const { name, schema } = item;
    return MongooseModule.forFeature([{ name, schema }]);
  });
}

@Module({
  imports: [
    ...importMongooseModules([
      { name: Organization.name, schema: OrganizationSchema },
      { name: User.name, schema: UserSchema },
      { name: Member.name, schema: MemberSchema }
    ])
  ],
  controllers: [OrganizationsController, UsersController, MembersController],
  providers: [OrganizationsService, UsersService, MembersService],
  exports: [UsersService],
})
export class ApiModule {}