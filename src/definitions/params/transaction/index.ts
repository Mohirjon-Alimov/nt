import { Types } from 'mongoose';
import Joi from 'joi';

export class TransactionParams {
  amount: number;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;

  constructor(params: TransactionParams) {
    if (params) {
      this.sender = params.sender;
      this.receiver = params.receiver;
      this.amount;
    }
  }

  async validate() {
    return TransactionParamsSchema.validateAsync(this);
  }
}

const TransactionParamsSchema = Joi.object({
  sender: Joi.string().trim().required().pattern(new RegExp('^[0-9a-fA-F]{24}$')),
  receiver: Joi.string().trim().required().pattern(new RegExp('^[0-9a-fA-F]{24}$')),
  amount: Joi.number().required(),
});