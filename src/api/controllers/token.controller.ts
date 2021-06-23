import { Request, Response } from 'express';
import { OK } from 'http-status';
import { link } from '../../constants';
import Compiler from '../../helpers/compiler.helper';

export const index = (req: Request, res: Response) => {
  return res.status(OK).json({
    message: 'You are accessing the APIv1 index token end point!',
  });
};

export const create = (req: Request, res: Response) => {
  const compiler = new Compiler();
  const compiled = compiler
    .from(link.stub)
    .with(req.body.replacements)
    .compile();

  return res.status(OK).json({
    message: 'New token created!',
    data: compiled,
  });
};
