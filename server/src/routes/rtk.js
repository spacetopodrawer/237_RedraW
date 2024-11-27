import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/connect', async (req, res, next) => {
  try {
    const { host, port, mountpoint } = req.body;
    const connection = {
      host,
      port,
      mountpoint,
      status: 'connecting',
      timestamp: new Date()
    };

    res.json({ success: true, connection });
  } catch (error) {
    next(error);
  }
});

router.get('/status/:id', async (req, res, next) => {
  try {
    res.json({ status: 'checking' });
  } catch (error) {
    next(error);
  }
});

export default router;