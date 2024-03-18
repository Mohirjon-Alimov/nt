import { RequirementError } from '../Errors';
import { BaseEntityInterface, UserEntity } from '../entities';


export class UsersRepository {
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


  // static async create(_user: UserEntity): Promise<UserEntity> {
  //
  // }
}