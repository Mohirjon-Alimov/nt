import { UserCardEntity } from '../../../core';
import { Types } from 'mongoose';

export class ClientCardResponse {

  cardId: Types.ObjectId;

  bankId?: Types.ObjectId;

  cardNumber: string;

  expireDate: string;

  constructor(params: UserCardEntity) {
    if (params && params instanceof UserCardEntity) {
      this.cardId = params.getCardId();
      this.bankId = params.getBankId();
      this.cardNumber = params.getCardNumber();
      this.expireDate = params.getExpireDate();

    }
  }
}