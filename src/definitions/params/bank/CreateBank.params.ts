import Joi from 'joi';

export class CreateBankParams {

  money: number;

  name: string;

  constructor(params: CreateBankParams) {
    if (params) {
      this.money = params.money;
      this.name = params.name;
    }
  }

  async validate() {
    return await createBankParamsSchema.validateAsync(this);
  }

}

const createBankParamsSchema = Joi.object<CreateBankParams>({
  name: Joi.string().required(),
  money: Joi.number().required(),
});