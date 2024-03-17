import { Types } from 'mongoose';
import { BankSchema } from '../schemas';
import { BaseEntityInterface } from './BaseEntity.interface';

export class BankEntity implements BaseEntityInterface<BankEntity, BankSchema> {
  protected _id?: Types.ObjectId;
  protected _name?: string;
  protected _money?: number;
  protected _createdAt?: Date;
  protected _updatedAt?: Date;

  getId(): Types.ObjectId {
    return this._id;
  }

  getName(): string {
    return this._name;
  }

  getMoney(): number {
    return this._money;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }

  buildId(_id: Types.ObjectId): BankEntity {
    this._id = _id;
    return this;
  }

  buildName(_name: string): BankEntity {
    this._name = _name;
    return this;
  }

  buildMoney(_money: number): BankEntity {
    this._money = _money
    return this
  }

  buildCreatedAt(_createdAt: Date): BankEntity {
    this._createdAt = _createdAt;
    return this;
  }

  buildUpdatedAt(_updatedAt: Date): BankEntity {
    this._updatedAt = _updatedAt;
    return this;
  }

  convertToEntity(bank: BankSchema): BankEntity {
    return bank
      ? this.buildId(bank.id)
        .buildName(bank.name)
        .buildMoney(bank.money)
        .buildCreatedAt(bank.createdAt)
        .buildUpdatedAt(bank.updatedAt)
      : null;
  }

  convertToSchema(): BankSchema {
    return this
      ? {
        id: this.getId(),
        name: this.getName(),
        money: this.getMoney(),
        createdAt: this.getCreatedAt(),
        updatedAt: this.getUpdatedAt(),
      }
      : null;
  }
}