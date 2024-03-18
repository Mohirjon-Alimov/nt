import { Types } from 'mongoose';
import { UserStatusEnum } from '../enums';
import { UserCardEntity } from './UserCard.entity';


export class UserEntity {
  protected _id: Types.ObjectId
  protected _firstName: string
  protected _lastName: string
  protected _email: string
  protected _passwordHash: string
  protected _phoneNumber: number
  protected _status: UserStatusEnum
  protected _cards: Array<UserCardEntity>

}