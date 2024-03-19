import { Types } from 'mongoose';
import { ClientEntity } from '../../../core';


export class ClientListResponse {
  id: Types.ObjectId

  fullName: string

  email: string

  phoneNumber: string

  constructor(params: ClientEntity){
    if (params && params instanceof ClientEntity){
      this.id = params.getId()
      this.fullName = params.getFullName()
      this.email = params.getEmail()
      this.phoneNumber = params.getPhoneNumber()
    }
  }
}