import { Types } from 'mongoose';
import { ClientTypeEnum } from '../../../core/enums';
import Joi from 'joi';
import { IdParamsSchema } from '../IdParams';

export class CreateClientParams {
  bankId: Types.ObjectId
  fullName?: string;
  email?: string;
  passwordHash: string;
  phoneNumber: number;
  type: ClientTypeEnum;
  constructor(params: CreateClientParams) {
    if (params) {
    }
  }
}

const createClientParamsSchema = Joi.object<CreateClientParams>({
  bankId: IdParamsSchema.required(),
  fullName: Joi.string().max(50),
  email: Joi.string().max(50),
  // passwordHash: Joi.
})