import { Types } from 'mongoose';
import { prop } from '@typegoose/typegoose';
import { ClientStatusEnum, ClientTypeEnum } from '../../../enums';


export class ClientSchema {
  _id: Types.ObjectId;

  @prop()
  fullName?: string;

  @prop()
  email?: string;

  @prop()
  passwordHash: string;

  @prop()
  phoneNumber: number;

  @prop({ enum: ClientStatusEnum, default: ClientStatusEnum.CREATED })
  status: ClientStatusEnum;

  @prop({ _id: false })
  cards?: Array<UserCardSchema>;

  @prop()
  corporation_number?: number;

  @prop({ enum: ClientTypeEnum, default: ClientTypeEnum.USER })
  type: ClientTypeEnum;

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