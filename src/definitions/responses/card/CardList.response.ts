import { Types } from 'mongoose';
import { CardEntity } from '../../../core';


export class CardListResponse {
  id: Types.ObjectId;

  bankId: Types.ObjectId;

  expireDate: string;

  cardNumber: string;

  constructor(params: CardEntity) {
    if (params && params instanceof CardEntity) {
      this.id = params.getId();
      this.bankId = params.getBankId();
      this.expireDate = params.getExpireDate();
      this.cardNumber = params.getCardNumber();
    }
  }
}