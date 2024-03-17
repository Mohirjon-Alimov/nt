import * as Joi from 'joi';

export class BaseListParams {
  page: number;

  size: number;

  constructor(params: BaseListParams) {
    if (params) {
      this.page = params.page;
      this.size = params.size;
    }
  }

  async validate() {
    return await BaseSchemaParams.validateAsync(this);
  }
}

export const BaseSchemaParams = Joi.object<BaseListParams>({
  page: Joi.number().max(999999999).empty(1).default(1),
  size: Joi.number().max(999999999).empty(10).default(10),
});
