import { Types } from 'mongoose';


export class UserCardEntity {
  protected _cardId: Types.ObjectId
  protected _cardNumber: number
  protected _expireDate: string
}