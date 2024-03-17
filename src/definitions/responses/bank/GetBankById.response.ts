import { BankEntity } from '../../../core';
import { Types } from 'mongoose';

export class GetBankByIdResponse{
  id: Types.ObjectId

  name: string

  money: number

  createdAt: Date

  updatedAt: Date

  constructor(bank: BankEntity) {
    if (bank && bank instanceof BankEntity) {
      this.id = bank.getId()
      this.name = bank.getName()
      this.money = bank.getMoney()
      this.updatedAt = bank.getUpdatedAt()
      this.createdAt = bank.getCreatedAt()
    }
  }
}