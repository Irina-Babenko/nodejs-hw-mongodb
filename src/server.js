import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';

import { env } from './utils/env.js';

export const startServer = () => {
  const app = express();

  app.use(cors());
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);

  app.get('/', (req, res) => {
    res.json({
      messege: 'Start project',
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      messege: '${req.url} not found',
    });
  });

  app.use((error, req, res, next) => {
    res.status(500).json({
      messege: error.messege,
    });
  });

  const port = Number(env('PORT', 3000));

  app.listen(port, () => console.log(`Server running on ${port} PORT`));
};
