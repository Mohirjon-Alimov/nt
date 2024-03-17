import * as express from 'express';
import { sendError, sendSuccess, sendValidationError } from '../../services';
import { GetBankByIdResponse, IdParams, NotFoundError } from '../../definitions';
import { BankRepository } from '../../core';

export async function GetBankByIdController(req: express.Request, res: express.Response) {
  let idParams: IdParams;
  let response: GetBankByIdResponse;

  try {
    idParams = await new IdParams(req.params).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    console.log(idParams);

    const bank = await BankRepository.getById(idParams.id);
    if (!bank) {
      throw new NotFoundError('Bank');
    }

    response = new GetBankByIdResponse(bank);

    sendSuccess(response, res);

  } catch (error) {
    sendError(error, res);
  }
}