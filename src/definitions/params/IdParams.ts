import * as Joi from 'joi';
import { Types } from 'mongoose';

export class IdParams {
  id: Types.ObjectId;

  constructor(params: IdParams) {
    if (params) {
      this.id = params.id;
    }
  }

  async validate() {
    return await IdParamsSchema.validateAsync(this);
  }
}

export const IdParamsSchema = Joi.object<IdParams>({
  id: Joi.string().trim().required().pattern(new RegExp('^[0-9a-fA-F]{24}$')),
});
