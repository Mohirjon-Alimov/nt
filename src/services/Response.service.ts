import * as express from "express";
import { FailToMatchError, RequirementError } from '../core';
export function sendSuccess(data: any, res: express.response, status = 200) {
  return res.status(status).send({
    error: null,
    data: data,
  });
}

export function sendError(error: any, res: express.response, status = 500) {
  return res.status(status).send({
    message: error?.message,
    data: null,
  });
}

export function sendValidationError(error: any, res: express.Response, status: number = 422) {
  console.error('ERROR: ', error);
  const label = error?.details[0]?.context?.label;
  const type = error?.details[0]?.type;
  switch (type) {
    case 'any.required':
      error = new RequirementError(label);
      return res.status(status).send({
        code: error.code,
        message: error?.message,
        data: null,
      });
    default:
      error = new FailToMatchError(label);
      return res.status(status).send({
        code: error.code,
        message: error?.message,
        data: null,
      });
  }
}