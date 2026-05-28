import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import healthRoutes from './routes/health.routes.js';
import statusRoutes from './routes/status.routes.js';
import infoRoutes from './routes/info.routes.js';

import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Kubernetes Deployment Lab API',
    status: 'running',
    documentation: {
      health: '/health',
      status: '/api/status',
      info: '/api/info'
    }
  });
});

app.use('/health', healthRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/info', infoRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;