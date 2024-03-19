import * as express from 'express';
import { sendError, sendSuccess, sendValidationError, UtilityService } from '../../services';
import { BaseError, ClientConfirmRegisterParams, InvalidVerificationCodeError } from '../../definitions';
import { sign, verify } from 'jsonwebtoken';
import {
  CardEntity,
  CardStatusEnum,
  ClientEntity,
  ClientRepository,
  ClientTypeEnum,
  Redis,
  UserCardEntity,
} from '../../core';
import { CardRepository } from '../../core';

export async function ClientConfirmRegisterController(req: express.Request, res: express.Response) {
  let params: ClientConfirmRegisterParams;
  const token = req.headers['nextsteptoken'];

  try {
    params = await new ClientConfirmRegisterParams(req.body).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    const verifying: string = JSON.stringify(verify(token, process.env.JWT_SECRET));
    const session = JSON.parse(verifying)?.params.session;

    const redisClient = Redis.getInstance();
    const cacheData = JSON.parse(await redisClient.get(session));

    if (!cacheData) {
      throw new BaseError('Otp is expired');
    }
    const bank = cacheData.bankId;

    const expireDate = () => {
      const date = new Date();
      const currentYear = date.getFullYear();
      let currentMonth = date.getMonth() + 1;
      if (currentMonth < 10) return `0${currentMonth}/${(currentYear + 5).toString().slice(-2)}`;
      else return `${currentMonth}/${(currentYear + 5).toString().slice(-2)}`;
    };
    if (params.otp !== cacheData?.otp) {
      throw new InvalidVerificationCodeError();
    }

    const clientCard = new CardEntity()
      .buildStatus(CardStatusEnum.ACTIVE)
      .buildExpireDate(expireDate())
      .buildBankId(bank)
      .buildMoney(0);
    if (cacheData.client.type === ClientTypeEnum.CORP_CLIENT) {
      clientCard.buildCardNumber(UtilityService.generate20DigitNumber().toString());
    } else {
      clientCard.buildCardNumber(UtilityService.generate16DigitNumber().toString());
    }

    const newCard = await CardRepository.create(clientCard);


    const cardForClient = new UserCardEntity()
      .buildCardNumber(newCard.getCardNumber())
      .buildBankId(newCard.getBankId())
      .buildExpireDate(newCard.getExpireDate());


    const client: ClientEntity = new ClientEntity()
      .buildFullName(cacheData.client.fullName)
      .buildEmail(cacheData.client.email)
      .buildPasswordHash(cacheData.client.passwordHash)
      .buildPhoneNumber(cacheData.client.phoneNumber)
      .buildStatus(cacheData.client.status)
      .buildType(cacheData.client.type)
      .buildCards([cardForClient.convertToSchema()]);


    const created = await ClientRepository.create(client);

    sendSuccess({
      sign: true,
      accessToken: sign({ id: created.getId(), password: created.getPasswordHash() }, process.env.JWT_SECRET),
    }, res);


  } catch (error) {
    sendError(error, res);
  }
}