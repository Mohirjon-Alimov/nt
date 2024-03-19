import { Types } from 'mongoose';
import { prop } from '@typegoose/typegoose';
import { CardStatusEnum } from '../../../enums';


export class CardSchema {
  _id: Types.ObjectId;

  @prop()
  bankId: Types.ObjectId;

  @prop()
  cardNumber: string;

  @prop()
  expireDate: string;

  @prop({ default: 0})
  money:number

  @prop({ enum: CardStatusEnum, default: CardStatusEnum.ACTIVE })
  status: CardStatusEnum;

  createdAt: Date;

  updatedAt: Date;
}