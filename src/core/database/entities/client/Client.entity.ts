import { Types } from 'mongoose';
import { ClientStatusEnum, ClientTypeEnum } from '../../../enums';
import { UserCardEntity } from '../card';
import { ClientSchema, UserCardSchema } from '../../schemas';
import { BaseEntityInterface } from '../BaseEntity.interface';

export class ClientEntity implements BaseEntityInterface<ClientEntity, ClientSchema> {
  protected _id: Types.ObjectId;
  protected _fullName: string;
  protected _email: string;
  protected _passwordHash: string;
  protected _phoneNumber: number;
  protected _status: ClientStatusEnum;
  protected _type: ClientTypeEnum;
  protected _cards: Array<UserCardEntity>;
  protected _corporation_number: number;
  protected _createdAt: Date;
  protected _updatedAt: Date;

  getId(): Types.ObjectId {
    return this._id;
  }

  getFullName(): string {
    return this._fullName;
  }

  getEmail(): string {
    return this._email;
  }

  getPasswordHash(): string {
    return this._passwordHash;
  }

  getPhoneNumber(): number {
    return this._phoneNumber;
  }

  getStatus(): ClientStatusEnum {
    return this._status;
  }

  getType(): ClientTypeEnum {
    return this._type;
  }

  getCards(): Array<UserCardEntity> {
    return this._cards;
  }

  getCorporationNumber(): number {
    return this._corporation_number;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }

  buildId(_id: Types.ObjectId): ClientEntity {
    this._id = _id;
    return this;
  }

  buildFullName(fullName: string): ClientEntity {
    this._fullName = fullName;
    return this;
  }

  buildEmail(email: string): ClientEntity {
    this._email = email;
    return this;
  }

  buildPasswordHash(passwordHash: string): ClientEntity {
    this._passwordHash = passwordHash;
    return this;
  }

  buildPhoneNumber(phoneNumber: number): ClientEntity {
    this._phoneNumber = phoneNumber;
    return this;
  }

  buildStatus(status: ClientStatusEnum): ClientEntity {
    this._status = status;
    return this;
  }

  buildType(type: ClientTypeEnum): ClientEntity {
    this._type = type;
    return this;
  }

  buildCards(cards: Array<UserCardSchema>): ClientEntity {
    this._cards = cards.map(card => new UserCardEntity().convertToEntity(card));
    return this;
  }

  buildCorporationNumber(corporationNumber: number): ClientEntity {
    this._corporation_number = corporationNumber;
    return this;
  }

  buildCreatedAt(createdAt: Date): ClientEntity {
    this._createdAt = createdAt;
    return this;
  }

  buildUpdatedAt(updatedAt: Date): ClientEntity {
    this._updatedAt = updatedAt;
    return this;
  }

  convertToEntity(client: ClientSchema): ClientEntity {
    return client
      ? this.buildId(client._id)
        .buildFullName(client.fullName)
        .buildStatus(client.status)
        .buildEmail(client.email)
        .buildType(client.type)
        .buildPhoneNumber(client.phoneNumber)
        .buildPasswordHash(client.passwordHash)
        .buildCards(client.cards)
        .buildCorporationNumber(client.corporation_number)
        .buildCreatedAt(client.createdAt)
        .buildUpdatedAt(client.updatedAt)
      : null;
  }

  convertToSchema(): ClientSchema {
    return this
      ? {
        _id: this.getId(),
        fullName: this.getFullName(),
        email: this.getEmail(),
        passwordHash: this.getPasswordHash(),
        phoneNumber: this.getPhoneNumber(),
        status: this.getStatus(),
        cards: this.getCards()?.map(card => card.convertToSchema()),
        corporation_number: this.getCorporationNumber(),
        type: this.getType(),
        createdAt: this.getCreatedAt(),
        updatedAt: this.getUpdatedAt(),
      }
      : null;
  }
}
