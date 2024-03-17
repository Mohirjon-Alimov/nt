import { BankEntity } from '../../../core';
import { Types } from 'mongoose';

export class GetBankListResponse{
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
      this.createdAt = bank.getCreatedAt()
      this.updatedAt = bank.getUpdatedAt()
    }
  }
}