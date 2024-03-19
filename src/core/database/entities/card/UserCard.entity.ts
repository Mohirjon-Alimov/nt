import { Types } from 'mongoose';
import { BaseEntityInterface } from '../BaseEntity.interface';
import { UserCardSchema } from '../../schemas';

export class UserCardEntity implements BaseEntityInterface<UserCardEntity, UserCardSchema> {
  protected _cardId: Types.ObjectId;
  protected _bankId?: Types.ObjectId;
  protected _cardNumber: string;
  protected _expireDate: string;

  getCardId(): Types.ObjectId {
    return this._cardId;
  }

  getBankId(): Types.ObjectId {
    return this._bankId;
  }

  getCardNumber(): string {
    return this._cardNumber;
  }

  getExpireDate(): string {
    return this._expireDate;
  }

  buildCardId(cardId: Types.ObjectId): UserCardEntity {
    this._cardId = cardId;
    return this;
  }

  buildBankId(_id: Types.ObjectId): UserCardEntity {
    this._bankId = _id;
    return this;
  }

  buildCardNumber(cardNumber: string): UserCardEntity {
    this._cardNumber = cardNumber;
    return this;
  }

  buildExpireDate(expireDate: string): UserCardEntity {
    this._expireDate = expireDate;
    return this;
  }

  convertToEntity(card: UserCardSchema): UserCardEntity {
    return card
      ? this.buildCardId(card.cardId)
        .buildCardNumber(card.cardNumber)
        .buildExpireDate(card.expireDate)
      : null;
  }

  convertToSchema(): UserCardSchema {
    return this
      ? {
        cardId: this.getCardId(),
        cardNumber: this.getCardNumber(),
        expireDate: this.getExpireDate(),
      }
      : null;
  }
}
