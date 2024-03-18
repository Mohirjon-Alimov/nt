import { FilterQuery, Types } from 'mongoose';
import { BaseEntityInterface } from '../database/entities';
import { PaginationInterface } from '../interfaces';
import { RequirementError } from '../Errors';

export abstract class BaseCRUDRepository<T extends BaseEntityInterface<T, K>, K>  {
  // T -> is entity
  // K -> is model
  abstract getById(id: Types.ObjectId): Promise<T>;
  abstract list(pagination?: PaginationInterface, filter?: FilterQuery<any>, sort?: any): Promise<Array<T>>;

  protected checkRequiredFields(fields: string[], obj: T): void {
    for (const field of fields) {
      if (obj[field] === null || obj[field] === undefined) throw new RequirementError(field);
    }
  }

  protected multipleConverter(_modelClassItems: K[], TCreator: { new (): T }): Array<T> {
    const entities: T[] = [];
    for (const item of _modelClassItems) {
      const entityObject = new TCreator().convertToEntity(item);
      entities.push(entityObject);
    }
    return entities;
  }
}
