import { CardEntity, BaseEntityInterface } from '../../database';
import { CardModel } from '../../database';
import { PaginationInterface } from '../../interfaces';
import { FilterQuery, Types } from 'mongoose';
import { RequirementError } from '../../Errors';
import { CardSchema } from '../../database/schemas/card';


export class CardRepository {
  private static checkRequiredFields<E>(fields: string[], entity: E) {
    for (const field of fields) {
      if (entity[field] === null || entity[field] === undefined) throw new RequirementError(field as string);
    }
  }

  private static multipleConverter<T extends BaseEntityInterface<T, K>, K>(_modelClassItems: K[], TCreator: {
    new(): T
  }): T[] {
    const entities: T[] = [];
    for (const item of _modelClassItems) {
      const entityObject = new TCreator().convertToEntity(item);
      entities.push(entityObject);
    }
    return entities;
  }

  static async create(_card: CardEntity): Promise<CardEntity> {
    const requiredFields: string[] = ['_bankId', '_money', '_expireDate', '_status'];
    this.checkRequiredFields(requiredFields, _card);

    const cardToCreate: CardSchema = _card.convertToSchema();
    const created = await CardModel.create(cardToCreate);
    return new CardEntity().convertToEntity(created);
  }

  static async list(pagination?: PaginationInterface, filter?: FilterQuery<any>, sort?: any): Promise<Array<CardEntity>> {
    const cards = await CardModel.find(filter)
      .limit(pagination.size)
      .skip((pagination.page - 1) * pagination.size)
      .sort(sort);
    return this.multipleConverter<CardEntity, CardSchema>(cards, CardEntity);
  }

  static async getById(id: Types.ObjectId): Promise<CardEntity> {
    const card = await CardModel.findOne({ _id: id });
    return new CardEntity().convertToEntity(card);
  }

  static async countDocumentsByFilter(filter: FilterQuery<any>): Promise<number> {
    return CardModel.countDocuments(filter);
  }

}