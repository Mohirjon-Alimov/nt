import { Types } from 'mongoose';
import { prop } from '@typegoose/typegoose';
import { UserStatusEnum } from '../enums';


export class UserSchema {
  _id: Types.ObjectId;

  @prop()
  firstName?: string;

  @prop()
  lastName?: string;

  @prop()
  email?: string;

  @prop()
  passwordHash: string;

  @prop()
  phoneNumber: number;

  @prop({ enum: UserStatusEnum, default: UserStatusEnum.CREATED })
  status: UserStatusEnum;

  @prop({ _id: false })
  cards?: Array<UserCardSchema>;

  createdAt: Date;

  updatedAt: Date;

}

export class UserCardSchema {

  @prop()
  cardId: Types.ObjectId;

  @prop()
  cardNumber: number;

  @prop()
  expireDate: string;
}