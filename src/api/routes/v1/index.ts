import { Router } from 'express';
import { OK } from 'http-status';

import tokenRouter from './token.route';

const router = Router();

router.use('/token', tokenRouter);

router.get('/', (req, res) => {
  return res.status(OK).json({
    message: 'You are accessing the Main APIv1 end point!',
  });
});

export default router;
