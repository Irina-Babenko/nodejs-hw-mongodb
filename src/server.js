import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';

import { env } from './utils/env.js';

import * as contactsServices from './services/contacts.js';

export const startServer = () => {
  const app = express();

  app.use(cors());
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);

  app.get('/contacts', async (req, res) => {
    const data = await contactsServices.getContacts();

    res.json(
      JSON.parse(
        JSON.stringify(
          {
            status: 200,
            message: 'Successfully found contacts!',
            data,
          },
          null,
          2,
        ),
      ),
    );
  });

  app.get('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const data = await contactsServices.getContactsById(id);

    if (!data) {
      return res.status(404).json(
        JSON.parse(
          JSON.stringify(
            {
              status: 404,
              message: `Contact not found`,
            },
            null,
            2,
          ),
        ),
      );
    }

    res.json(
      JSON.parse(
        JSON.stringify(
          {
            status: 200,
            message: `Successfully found contact with id ${id}!`,
            data,
          },
          null,
          2,
        ),
      ),
    );
  });

  app.use((req, res) => {
    res.status(404).json(
      JSON.parse(
        JSON.stringify(
          {
            message: `${req.url} not found`,
          },
          null,
          2,
        ),
      ),
    );
  });

  app.use((error, req, res, next) => {
    res.status(500).json(
      JSON.parse(
        JSON.stringify(
          {
            message: 'Internal Server Error',
          },
          null,
          2,
        ),
      ),
    );
  });

  const port = Number(env('PORT', 3000));

  app.listen(port, () => console.log(`Server running on ${port} PORT`));
};
