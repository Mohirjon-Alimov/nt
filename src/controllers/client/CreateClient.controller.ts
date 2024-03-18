import express from 'express';
import { sendError, sendValidationError } from '../../services';

export async function CreateClientController(req: express.Request, res: express.Response) {
  let params;
  let response;


  try {

  } catch (error) {
    return sendValidationError(error, res);
  }

  try {

  } catch (error) {
    sendError(error, res);
  }
}