import { Types } from 'mongoose';
import { prop, Severity } from '@typegoose/typegoose';
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
  phoneNumber: string;

  @prop({ enum: ClientStatusEnum, default: ClientStatusEnum.CREATED })
  status: ClientStatusEnum;

  @prop({ _id: false, allowMixed: Severity.ALLOW })
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
  cardNumber: string;

  @prop()
  expireDate: string;
}