import { Request, Response, NextFunction } from 'express';

import { BaseMiddleware } from './base/baseMiddleware';

export interface BaseRequest<T> {
  body: T;
  file?: Express.Multer.File;
  headers?: Record<string, unknown>;
  query?: Record<string, unknown>;
  params?: Record<string, unknown>;
}

export class MakeRequest extends BaseMiddleware {
  constructor(private readonly dtoClass: { from: any }) {
    super();
  }

  execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Promise<void> {
    try {
      req.body = {
        ...req.body,
        ...req.params,
        ...req.headers,
        ...req.query,
      };

      const dto = this.dtoClass.from(req.body);
      req.body = dto;

      next();
    } catch (error: any) {
      res.status(422).json({
        error: 'Validation Error',
        details: error?.errors ?? error?.message ?? error,
      });
    }
  }

  static make(dto: any) {
    return new MakeRequest(dto).execute;
  }
}
