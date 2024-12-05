import express from 'express';
const router = express.Router();

router.post('/process', async (req, res, next) => {
  try {
    const { data } = req.body;
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

router.get('/data', async (req, res, next) => {
  try {
    res.json({ data: [] });
  } catch (error) {
    next(error);
  }
});

export default router;