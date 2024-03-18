import * as express from 'express';
import { sendError } from '../services';

export async function SomeController(req: express.Request, res: express.Response) {


  try {




  } catch (error) {
    sendError(error, res);
  }
}