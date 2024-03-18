import { Types } from 'mongoose';
import { prop } from '@typegoose/typegoose';
import { CardStatusEnum } from '../../../enums';


export class CardSchema {
  _id: Types.ObjectId;

  @prop()
  cardNumber: number;

  @prop()
  expireDate: string;

  @prop({ enum: CardStatusEnum, default: CardStatusEnum.ACTIVE })
  status: CardStatusEnum;

  createdAt: Date;

  updatedAt: Date;
}