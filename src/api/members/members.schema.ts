import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Organization } from '../organizations/organizations.schema';

export type MemberDocument = Member & Document;


@Schema({ versionKey: false })
export class Member {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: false, default: '' })
  middleName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Organization.name })
  organization: Organization;
}

export const MemberSchema = SchemaFactory.createForClass(Member);