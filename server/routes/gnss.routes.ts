import { Router } from 'express';
import { GNSSController } from '../controllers/gnss.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/upload', GNSSController.uploadData);
router.get('/data', GNSSController.getData);

export default router;