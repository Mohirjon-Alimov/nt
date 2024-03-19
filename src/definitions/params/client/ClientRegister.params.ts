import { Types } from 'mongoose';
import { ClientTypeEnum } from '../../../core/enums';
import Joi from 'joi';

export class ClientRegisterParams {
  bankId: Types.ObjectId;

  email: string;

  phoneNumber: string;

  password: string;

  type: ClientTypeEnum;

  fullName?: string;

  session?: Types.ObjectId;

  constructor(params: ClientRegisterParams) {
    if (params) {
      this.bankId = params.bankId;
      this.email = params.email;
      this.password = params.password;
      this.phoneNumber = params.phoneNumber;
      this.type = params.type;
      this.fullName = params.fullName;
      this.session = params.session;
    }
  }

  async validate() {
    return clientRegisterParamsSchema.validateAsync(this);
  }
}

const clientRegisterParamsSchema = Joi.object<ClientRegisterParams>({
  password: Joi.string().trim().required().min(8).max(16),
  phoneNumber: Joi.string().length(12).pattern(/^[0-9]+$/).required(),
  type: Joi.string().valid(...Object.values(ClientTypeEnum)),
  fullName: Joi.string().trim(),
  email: Joi.string().trim().email().required(),
  bankId: Joi.string().trim().required().pattern(new RegExp('^[0-9a-fA-F]{24}$')),
  session: Joi.string().trim(),
});