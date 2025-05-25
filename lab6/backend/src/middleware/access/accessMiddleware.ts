import { NextFunction, Request, RequestHandler, Response } from 'express';

export const accessMiddleware: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
  if (request.baseUrl.includes('admin')) {
      return next();
  }

  if (!request.session["customerName"]) {
      response.status(401).json({ message: "Unauthorized" });
  } else {
      next();
  }
}