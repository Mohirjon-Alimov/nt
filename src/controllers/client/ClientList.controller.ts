import * as express from 'express';
import { ClientRepository, ListInterface } from '../../core';
import { sendError, sendSuccess, sendValidationError } from '../../services';
import { BaseListParams, ClientListResponse } from '../../definitions';
import { FilterQuery } from 'mongoose';

export async function ClientListController(req: express.Request, res: express.Response) {
  let params: BaseListParams;
  let response: ListInterface<ClientListResponse> = {
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
    const listParams = {
      pagination: {
        size: params.size,
        page: params.page,
      },
      filter: filter,
      sort: { createdAt: -1 },
    };

    let result = await ClientRepository.list(
      listParams.pagination,
      listParams.filter,
      listParams.sort,
    );

    response.meta.count = await ClientRepository.countDocumentsByFilter(listParams.filter);
    response.meta.pages = Math.ceil(response.meta.count / listParams.pagination.size);
    if (response.meta.pages < response.meta.currentPage) response.meta.currentPage = response.meta.pages;

    response.items = result.map(object => new ClientListResponse(object))
    sendSuccess(response, res);

  } catch (error) {
    sendError(error, res);
  }
}