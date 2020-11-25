import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Members } from './organizations.interface';

export type OrganizationDocument = Organization & Document;


@Schema({ versionKey: false })
export class Organization {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false, default: '' })
  description: string;

  @Prop({ required: true })
  type: string;

  // @Prop({})
  // members: Members;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);