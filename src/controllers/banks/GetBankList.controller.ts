import express from 'express';
import { BankRepository, ListInterface } from '../../core';
import { BaseListParams, GetBankListResponse } from '../../definitions';
import { FilterQuery } from 'mongoose';
import { sendError, sendSuccess, sendValidationError } from '../../services';


export async function GetBankListController(req: express.Request, res: express.Response) {
  let params: BaseListParams;
  let response: ListInterface<GetBankListResponse> = {
    meta: {
      count: 0,
      currentPage: 0,
      pages: 0,
    },
    items: [],
  };
  const filter: FilterQuery<any> = {};

  try {
    params = await new BaseListParams(req.query).validate();
  } catch (error) {
    return sendValidationError(error, res);
  }

  try {
    const getBankListParams = {
      pagination: {
        size: params.size,
        page: params.page,
      },
      filter: filter,
      sort: { createdAt: -1 },
    };

    let result = await BankRepository.list(
      getBankListParams.pagination,
      getBankListParams.filter,
      getBankListParams.sort,
    );

    response.meta.count = await BankRepository.countDocumentsByFilter(getBankListParams.filter);
    response.meta.pages = Math.ceil(response.meta.count / getBankListParams.pagination.size);
    if (response.meta.pages < response.meta.currentPage) response.meta.currentPage = response.meta.pages;
    response.items = result.map(obj => new GetBankListResponse(obj));

    sendSuccess(response, res);

  } catch (error) {
    sendError(error, res);
  }
}