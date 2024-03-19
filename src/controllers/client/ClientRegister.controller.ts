import * as express from 'express';
import { BaseError, ClientRegisterParams, EmailMessagesData, NotFoundError } from '../../definitions';
import { EmailService, sendError, sendSuccess, sendValidationError, UtilityService } from '../../services';
import { Types } from 'mongoose';
import { BankRepository, ClientEntity, ClientRepository, ClientStatusEnum, Password, Redis } from '../../core';
import { sign } from 'jsonwebtoken';

export async function ClientRegisterController(req: express.Request, res: express.Response) {
  let params: ClientRegisterParams;
  const otpLength = Number(process.env.GENERATED_OTP_LENGTH);
  const otpExpireSeconds = Number(process.env.OTP_EXPIRE_SECONDS);

  try {
    params = await new ClientRegisterParams(req.body).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    const bank = await BankRepository.getById(params.bankId);
    if (!bank) {
      throw new NotFoundError('Bank');
    }
    const existingClient = await ClientRepository.getByPhoneNumber(Number(params.phoneNumber))

    if (existingClient){
      throw new BaseError('Client already registered')
    }

    const client = new ClientEntity()
      .buildId(new Types.ObjectId())
      .buildFullName(params.fullName)
      .buildType(params.type)
      .buildEmail(params.email)
      .buildStatus(ClientStatusEnum.CREATED)
      .buildPhoneNumber(params.phoneNumber)
      .buildPasswordHash(await new Password().buildPassword(params.password).hash());
    params.session = new Types.ObjectId;

    const verCode = UtilityService.generateOtp(otpLength);
    const messageData = EmailMessagesData.otpMessage(verCode);
    const email = await EmailService.send(params.email, messageData.subject, messageData.text);

    const nextStepToken = sign({ params }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_AT });

    const redisClient = Redis.getInstance();
    await redisClient.set(params.session.toString(), JSON.stringify({
      client: client.convertToSchema(),
      otp: verCode,
      bankId: params.bankId,
    }), otpExpireSeconds);


    sendSuccess({
      sent: email.emailSent,
      otpLength,
      otpExpireSeconds,
      nextStepToken,
    }, res);
  } catch (error) {
    sendError(error, res);
  }
}