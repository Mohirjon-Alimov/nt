import * as express from 'express';
import { sendError, sendSuccess, sendValidationError } from '../../services';
import { GetClientByIdResponse, IdParams, NotFoundError } from '../../definitions';
import { ClientRepository } from '../../core';

export async function GetClientByIdController(req: express.Request, res: express.Response) {
  let idParams: IdParams;
  let response: GetClientByIdResponse;

  try {
    idParams = await new IdParams(req.params).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    console.log(idParams);

    const client = await ClientRepository.getById(idParams.id);
    if (!client) {
      throw new NotFoundError('client');
    }

    response = new GetClientByIdResponse(client);

    sendSuccess(response, res);

  } catch (error) {
    sendError(error, res);
  }
}