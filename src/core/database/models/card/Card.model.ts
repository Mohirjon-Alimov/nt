import { getModelForClass } from '@typegoose/typegoose';
import { CardSchema } from '../../schemas/card';


export const CardModel = getModelForClass(CardSchema, {
  schemaOptions: {
    collection: 'cards',
    timestamps: true,
    minimize: true,
    versionKey: false,
  },
});