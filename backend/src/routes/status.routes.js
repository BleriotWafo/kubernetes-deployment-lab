import { Router } from 'express';
import os from 'os';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    apiStatus: 'online',
    service: process.env.APP_NAME || 'Kubernetes Deployment Lab API',
    version: process.env.APP_VERSION || '1.0.0',
    environment: process.env.APP_ENVIRONMENT || process.env.NODE_ENV || 'local',
    uptime: {
      seconds: Math.floor(process.uptime()),
      readable: formatUptime(process.uptime())
    },
    system: {
      hostname: os.hostname(),
      platform: os.platform(),
      architecture: os.arch()
    },
    timestamp: new Date().toISOString()
  });
});

function formatUptime(uptimeInSeconds) {
  const hours = Math.floor(uptimeInSeconds / 3600);
  const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeInSeconds % 60);

  return `${hours}h ${minutes}m ${seconds}s`;
}

export default router;