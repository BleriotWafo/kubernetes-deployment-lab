import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API is healthy',
    timestamp: new Date().toISOString()
  });
});

router.get('/ready', (req, res) => {
  res.status(200).json({
    status: 'ready',
    message: 'API is ready to receive traffic',
    timestamp: new Date().toISOString()
  });
});

router.get('/live', (req, res) => {
  res.status(200).json({
    status: 'alive',
    message: 'API process is alive',
    timestamp: new Date().toISOString()
  });
});

export default router;