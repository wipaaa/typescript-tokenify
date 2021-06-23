import { Request, Response } from 'express';
import { OK } from 'http-status';

export const index = (req: Request, res: Response) => {
  return res.status(OK).json({
    message: 'You are accessing the APIv1 index token end point!',
  });
};

export const create = (req: Request, res: Response) => {
  return res.status(OK).json({
    message: 'You are accessing the APIv1 create token end point!',
    data: req.body,
  });
};
