import * as express from 'express';
import { sendError, sendSuccess, sendValidationError } from '../../services';
import { GetCardByIdResponse, IdParams, NotFoundError } from '../../definitions';
import { CardRepository } from '../../core';

export async function GetCardByIdController(req: express.Request, res: express.Response) {
  let idParams: IdParams;
  let response: GetCardByIdResponse;

  try {
    idParams = await new IdParams(req.params).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    const card = await CardRepository.getById(idParams.id);
    if (!card) {
      throw new NotFoundError('Card');
    }

    response = new GetCardByIdResponse(card);

    sendSuccess(response, res);

  } catch (error) {
    sendError(error, res);
  }
}