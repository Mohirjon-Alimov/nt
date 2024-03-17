import { BankSchema } from '../schemas';
import { BankEntity, BaseEntityInterface } from '../entities';
import { BankModel } from '../models';
import { PaginationInterface } from '../interfaces';
import { FilterQuery, Types } from 'mongoose';
import { RequirementError } from '../Errors';


export class BankRepository {
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

  static async create(_bank: BankEntity): Promise<BankEntity> {
    const requiredFields: string[] = ['_name'];
    this.checkRequiredFields(requiredFields, _bank);

    const bankToCreate: BankSchema = _bank.convertToSchema();
    const created = await BankModel.create(bankToCreate);
    return new BankEntity().convertToEntity(created);
  }

  static async list(pagination?: PaginationInterface, filter?: FilterQuery<any>, sort?: any): Promise<Array<BankEntity>> {
    const questions = await BankModel.find(filter)
      .limit(pagination.size)
      .skip((pagination.page - 1) * pagination.size)
      .sort(sort);
    return this.multipleConverter<BankEntity, BankSchema>(questions, BankEntity);
  }

  static async getById(id: Types.ObjectId): Promise<BankEntity> {
    const bank = await BankModel.findOne({ id: id });
    return new BankEntity().convertToEntity(bank);
  }

  static async countDocumentsByFilter(filter: FilterQuery<any>): Promise<number> {
    return BankModel.countDocuments(filter);
  }

}