import { Router } from 'express';
import os from 'os';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    project: {
      name: 'Kubernetes Deployment Lab',
      type: 'Portfolio DevOps Project',
      description:
        'A containerized full-stack application prepared for Docker and Kubernetes deployment.'
    },
    backend: {
      framework: 'Express.js',
      runtime: 'Node.js',
      apiVersion: process.env.APP_VERSION || '1.0.0'
    },
    deployment: {
      environment: process.env.APP_ENVIRONMENT || 'local',
      containerReady: true,
      kubernetesReady: true,
      healthChecks: {
        liveness: '/health/live',
        readiness: '/health/ready'
      }
    },
    host: {
      podName: process.env.HOSTNAME || os.hostname(),
      hostname: os.hostname()
    },
    endpoints: [
      {
        method: 'GET',
        path: '/',
        description: 'API welcome route'
      },
      {
        method: 'GET',
        path: '/health',
        description: 'Basic health check'
      },
      {
        method: 'GET',
        path: '/health/live',
        description: 'Kubernetes liveness probe endpoint'
      },
      {
        method: 'GET',
        path: '/health/ready',
        description: 'Kubernetes readiness probe endpoint'
      },
      {
        method: 'GET',
        path: '/api/status',
        description: 'API runtime status'
      },
      {
        method: 'GET',
        path: '/api/info',
        description: 'Project and deployment information'
      }
    ]
  });
});

export default router;