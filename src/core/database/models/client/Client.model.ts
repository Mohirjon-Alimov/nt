import { getModelForClass } from '@typegoose/typegoose';
import { ClientSchema } from '../../schemas';


export const ClientModel = getModelForClass(ClientSchema, {
  schemaOptions: {
    collection: 'clients',
    timestamps: true,
    minimize: true,
    versionKey: false,
  },
})
