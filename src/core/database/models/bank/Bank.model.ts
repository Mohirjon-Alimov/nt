import { getModelForClass } from '@typegoose/typegoose';
import { BankSchema } from '../../schemas';

export const BankModel = getModelForClass(BankSchema, {
  schemaOptions: {
    collection: 'banks',
    timestamps: true,
    minimize: true,
    versionKey: false,
  },
})
