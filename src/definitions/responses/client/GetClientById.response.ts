import { Types } from 'mongoose';
import { ClientEntity } from '../../../core';
import { ClientCardResponse } from '../card';

export class GetClientByIdResponse {
  id: Types.ObjectId;

  fullName: string;

  cards: Array<ClientCardResponse>;

  email: string;

  phoneNumber: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(params: ClientEntity) {
    if (params && params instanceof ClientEntity) {
      this.id = params.getId();
      this.fullName = params.getFullName();
      this.email = params.getEmail();
      this.phoneNumber = params.getPhoneNumber();
      this.cards = params.getCards()?.map(obj => new ClientCardResponse(obj));
      this.createdAt = params.getCreatedAt();
      this.updatedAt = params.getUpdatedAt();
    }
  }
}