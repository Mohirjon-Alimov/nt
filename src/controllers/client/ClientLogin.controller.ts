import express from 'express';
import { sendError, sendSuccess, sendValidationError } from '../../services';
import { ClientLoginParams, NotFoundError, BaseError } from '../../definitions';
import { ClientRepository, Password } from '../../core';
import { sign } from 'jsonwebtoken';

export async function ClientLoginController(req: express.Request, res: express.Response) {
  let params: ClientLoginParams;


  try {
    params = await new ClientLoginParams(req.body).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    const client = await ClientRepository.getByPhoneNumber(params.phoneNumber);
    if (!client) {
      throw new NotFoundError('Client');
    }


    const comparePassword = await new Password().buildPassword(params.password).buildHash(client.getPasswordHash()).compare();

    if (!comparePassword) {
      throw new BaseError('Incorrect password');
    }

    const accessToken = sign({ params }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_AT });

    sendSuccess({
      success: true,
      accessToken,
    }, res);

  } catch (error) {
    sendError(error, res);
  }
}