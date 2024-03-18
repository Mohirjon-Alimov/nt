// import { Types } from 'mongoose';
// import { BaseEntityInterface, ClientSchema } from '../database';
//
// // Объявляем интерфейс для схемы
// interface EntitySchema {
//   _id?: Types.ObjectId;
//   [key: string]: any; // Дополнительные поля в схеме
// }
//
// export class BaseEntity<T extends EntitySchema> implements BaseEntityInterface<BaseEntity<T>, T> {
//   protected _id?: Types.ObjectId;
//   protected schema: T;
//
//   constructor(schema: T) {
//     this.schema = schema;
//   }
//
//   // Остальные методы
//   // ...
// }
//
// // Функция для генерации Entity
// class GenerateEntity<Entity extends BaseEntity<any>, Schema extends EntitySchema> {
//   constructor(entityName: string, fields: (keyof Schema)[], schema: Schema) {
//     class CustomEntity extends BaseEntity<Schema> {
//       constructor() {
//         super(schema);
//       }
//     }
//
//     // Добавляем методы доступа к полям сущности
//     fields.forEach(field => {
//       Object.defineProperty(CustomEntity.prototype, `get${field.charAt(0).toUpperCase() + field.slice(1)}`, {
//         value: function() {
//           return this.schema[field];
//         },
//         enumerable: false
//       });
//
//       Object.defineProperty(CustomEntity.prototype, `build${field.charAt(0).toUpperCase() + field.slice(1)}`, {
//         value: function(value: Schema[keyof Schema]) {
//           this.schema[field] = value;
//           return this;
//         },
//         enumerable: false
//       });
//     });
//
//     // Добавляем имя сущности
//     Object.defineProperty(CustomEntity, 'name', { value: entityName });
//
//     // Экспортируем созданную сущность
//     return CustomEntity;
//   }
// }
//
// // Пример использования
// interface ClientSchema extends EntitySchema {
//   name?: string;
//   phone?: string;
//   status?: string;
// }
//
// const ClientEntity = new GenerateEntity("ClientEntity", ["name", "phone", "status"],
//   ClientSchema
// ) as new () => BaseEntity<ClientSchema>;
// console.log(ClientEntity);
// // Теперь можно создавать экземпляры ClientEntity и работать с ними
// // const client = new ClientEntity();
