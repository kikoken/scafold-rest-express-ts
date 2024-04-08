import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino';

import HealthCheck from '@interfaces/routes/healthCheck.route';
import UserRoutes from '@interfaces/routes/user.routes';

const app: Application = express();
const PORT = 3000;
const logger = pino();
const version = '/v1';

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(`${version}/user`, UserRoutes);
app.use(`${version}/health`, HealthCheck);

// Manejo de errores global
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  process.exit(1);
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  logger.error('Error starting server:', err.message);
  process.exit(1);
});
