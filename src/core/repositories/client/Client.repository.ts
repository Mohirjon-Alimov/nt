import { RequirementError } from '../../Errors';
import { BaseEntityInterface, ClientEntity, ClientModel, ClientSchema } from '../../database';
import { PaginationInterface } from '../../interfaces';
import { FilterQuery, Types } from 'mongoose';


export class ClientRepository {
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


  static async create(client: ClientEntity): Promise<ClientEntity> {
    const requiredFields: string[] = ['_phoneNumber', '_passwordHash'];
    this.checkRequiredFields(requiredFields, client);

    const clientToCreate = client.convertToSchema();
    const created = await ClientModel.create(clientToCreate);
    return new ClientEntity().convertToEntity(created);
  }

  static async list(pagination?: PaginationInterface, filter?: FilterQuery<any>, sort?: any): Promise<Array<ClientEntity>> {
    const clients = await ClientModel.find(filter)
      .limit(pagination.size)
      .skip((pagination.page - 1) * pagination.size)
      .sort(sort);
    return this.multipleConverter<ClientEntity, ClientSchema>(clients, ClientEntity);
  }

  static async getById(id: Types.ObjectId): Promise<ClientEntity> {
    const client = await ClientModel.findOne({ _id: id });
    return new ClientEntity().convertToEntity(client);
  }

  static async countDocumentsByFilter(filter: FilterQuery<any>): Promise<number> {
    return ClientModel.countDocuments(filter);
  }
}