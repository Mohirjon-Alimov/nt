import { Types } from 'mongoose';
import { BaseEntityInterface } from '../BaseEntity.interface';
import { CardSchema } from '../../schemas/card';
import { CardStatusEnum } from '../../../enums';

export class CardEntity implements BaseEntityInterface<CardEntity, CardSchema> {
  protected _id: Types.ObjectId;
  protected _bankId?: Types.ObjectId;
  protected _cardNumber: string;
  protected _expireDate: string;
  protected _money: number;
  protected _status: CardStatusEnum;
  protected _createdAt: Date;
  protected _updatedAt: Date;

  getId(): Types.ObjectId {
    return this._id;
  }

  getMoney(): number {
    return this._money;
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

  getStatus(): CardStatusEnum {
    return this._status;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }

  buildId(cardId: Types.ObjectId): CardEntity {
    this._id = cardId;
    return this;
  }

  buildMoney(money: number): CardEntity {
    this._money = money;
    return this;
  }

  buildBankId(_id: Types.ObjectId): CardEntity {
    this._bankId = _id;
    return this;
  }

  buildCardNumber(cardNumber: string): CardEntity {
    this._cardNumber = cardNumber;
    return this;
  }

  buildExpireDate(expireDate: string): CardEntity {
    this._expireDate = expireDate;
    return this;
  }

  buildStatus(status: CardStatusEnum): CardEntity {
    this._status = status;
    return this;
  }

  buildCreatedAt(_createdAt: Date): CardEntity {
    this._createdAt = _createdAt;
    return this;
  }

  buildUpdatedAt(_updatedAt: Date): CardEntity {
    this._updatedAt = _updatedAt;
    return this;
  }

  convertToEntity(card: CardSchema): CardEntity {
    return card
      ? this.buildId(card._id)
        .buildBankId(card.bankId)
        .buildMoney(card.money)
        .buildCardNumber(card.cardNumber)
        .buildExpireDate(card.expireDate)
        .buildStatus(card.status)
        .buildCreatedAt(card.createdAt)
        .buildUpdatedAt(card.updatedAt)
      : null;
  }

  convertToSchema(): CardSchema {
    return this
      ? {
        _id: this.getId(),
        money: this.getMoney(),
        bankId: this.getBankId(),
        status: this.getStatus(),
        cardNumber: this.getCardNumber(),
        expireDate: this.getExpireDate(),
        createdAt: this.getCreatedAt(),
        updatedAt: this.getUpdatedAt(),
      }
      : null;
  }
}
