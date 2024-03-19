import Joi from 'joi';

export class ClientLoginParams {
  password: string;

  phoneNumber: number;

  constructor(params: ClientLoginParams) {
    if (params) {
      this.password = params.password;
      this.phoneNumber = params.phoneNumber;
    }
  }

  async validate() {
    return await clientLoginParamsSchema.validateAsync(this);
  }
}

const clientLoginParamsSchema = Joi.object<ClientLoginParams>({
  password: Joi.string().trim().required().min(8).max(16),
  phoneNumber: Joi.string().length(12).pattern(/^[0-9]+$/).required(),
});