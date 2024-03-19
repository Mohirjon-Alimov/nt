import Joi from 'joi';

export class ClientConfirmRegisterParams {
  otp: number;


  constructor(params: ClientConfirmRegisterParams) {
    if (params) {
      this.otp = params.otp;
    }
  }

  async validate() {
    return clientConfirmRegisterParamsSchema.validateAsync(this);
  }
}

const clientConfirmRegisterParamsSchema = Joi.object<ClientConfirmRegisterParams>({
  otp: Joi.number().required(),
});
