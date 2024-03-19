import express from 'express';
import { CardRepository, ListInterface } from '../../core';
import { BaseListParams, CardListResponse } from '../../definitions';
import { FilterQuery } from 'mongoose';
import { sendError, sendSuccess, sendValidationError } from '../../services';


export async function GetCardListController(req: express.Request, res: express.Response) {
  let params: BaseListParams;
  let response: ListInterface<CardListResponse> = {
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
    const getCardListParams = {
      pagination: {
        size: params.size,
        page: params.page,
      },
      filter: filter,
      sort: { createdAt: -1 },
    };

    let result = await CardRepository.list(
      getCardListParams.pagination,
      getCardListParams.filter,
      getCardListParams.sort,
    );

    response.meta.count = await CardRepository.countDocumentsByFilter(getCardListParams.filter);
    response.meta.pages = Math.ceil(response.meta.count / getCardListParams.pagination.size);
    if (response.meta.pages < response.meta.currentPage) response.meta.currentPage = response.meta.pages;
    response.items = result.map(obj => new CardListResponse(obj));

    sendSuccess(response, res);
  } catch (error) {
    sendError(error, res);
  }
}