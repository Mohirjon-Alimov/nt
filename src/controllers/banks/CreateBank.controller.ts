import express from 'express';
import { BankEntity, BankRepository } from '../../core';
import { CreateBankParams, GetBankByIdResponse } from '../../definitions';
import { sendError, sendSuccess, sendValidationError } from '../../services';

export async function CreateBankController(req: express.Request, res: express.Response) {
  let params: CreateBankParams;
  let response: GetBankByIdResponse;


  try {
    params = await new CreateBankParams(req.body).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    const newBank = new BankEntity().buildName(params.name).buildMoney(params.money);

    const created = await BankRepository.create(newBank);

    response = new GetBankByIdResponse(created);

    sendSuccess(response, res);
  } catch (error) {
    sendError(error, res);
  }
}