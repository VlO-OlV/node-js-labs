import { NextFunction, Request, RequestHandler, Response } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';

export const validationMiddleware: RequestHandler = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const errors: Result<ValidationError> = validationResult(request);
  
  if (!errors.isEmpty()) {
    response.status(400).json({
      messages: errors.array().map((error) => error.msg),
    });
  } else {
    next();
  }
};