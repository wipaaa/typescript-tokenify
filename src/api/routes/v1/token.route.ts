import { Router } from 'express';
import * as controller from '../../controllers/token.controller';

const router = Router();

router.get('/', controller.index);
router.post('/', controller.create);

export default router;
