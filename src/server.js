import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import 'dotenv/config';

import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';

import { env } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { logger } from './middlewares/logger.js';
import { UPLOAD_DIR } from './constants/index.js';

export const startServer = () => {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(cookieParser());

  app.use(logger);

  app.use('/contacts', contactsRouter);

  app.use('/auth', authRouter);

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(env('PORT', 3000));

  app.listen(port, () => console.log(`Server running on ${port} PORT`));
};
