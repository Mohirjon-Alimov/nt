import * as express from 'express';
import { BaseError, TransactionParams } from '../../definitions';
import { sendError, sendSuccess, sendValidationError } from '../../services';
import { CardRepository, TransactionRepository } from '../../core';

export async function Transaction(req: express.Request, res: express.Response) {
  let params: TransactionParams;

  try {
    params = await new TransactionParams(req.body).validate();
  } catch (err) {
    return sendValidationError(err, res);
  }

  try {
    const receiverCard = await CardRepository.getById(params.receiver);
    const senderCard = await CardRepository.getById(params.sender);
    if (receiverCard && senderCard) {
      const transaction = await TransactionRepository.makeTransaction(senderCard, receiverCard, params.amount);
      sendSuccess({ success: transaction }, res);
    }
    throw new BaseError('Cannot make transaction');

  } catch (err) {
    sendError(err, res);
  }
}