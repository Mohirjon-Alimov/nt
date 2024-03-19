import { Types } from 'mongoose';
import { CardEntity, CardStatusEnum } from '../../../core';


export class GetCardByIdResponse {
  id: Types.ObjectId;

  bankId: Types.ObjectId;

  expireDate: string;

  cardNumber: string;

  money: number;

  status: CardStatusEnum;

  createdAt: Date;

  updatedAt: Date;

  constructor(params: CardEntity) {
    if (params && params instanceof CardEntity) {
      this.id = params.getId();
      this.bankId = params.getBankId();
      this.expireDate = params.getExpireDate();
      this.cardNumber = params.getCardNumber();
      this.money = params.getMoney();
      this.status = params.getStatus();
      this.createdAt = params.getCreatedAt();
      this.updatedAt = params.getUpdatedAt();
    }
  }
}