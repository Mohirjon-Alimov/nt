import { Types } from 'mongoose';
import { prop } from '@typegoose/typegoose';

export class BankSchema {
  id: Types.ObjectId;

  @prop()
  name: string;

  @prop()
  money: number;

  createdAt: Date;

  updatedAt: Date;


}