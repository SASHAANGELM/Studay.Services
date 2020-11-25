import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { ObjectId } from '../../utils/mongo';

interface Organizations {
  [key: string]: string
}

@Schema({ versionKey: false })
export class User {
  @Prop({ required: true, default: () => { return ObjectId() } })
  _id: string;

  @Prop({ required: false, default: '' })
  firstName: string;
  
  @Prop({ required: false, default: '' })
  middleName: string;
  
  @Prop({ required: false, default: '' })
  lastName: string;
  
  // @Prop({})
  // organizations: Organizations;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);