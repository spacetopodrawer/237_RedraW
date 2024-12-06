import { Router } from 'express';
import { GNSSController } from '../controllers/gnss.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/upload', GNSSController.uploadData);
router.get('/data', GNSSController.getData);

export default router;