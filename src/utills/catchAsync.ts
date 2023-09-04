import { NextFunction, Request, Response } from 'express';
const catchAsync =
  <T>(
    asyncFunction: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<T>
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(asyncFunction(req, res, next)).catch((err) => {
      next(err);
    });
  };

export default catchAsync;
