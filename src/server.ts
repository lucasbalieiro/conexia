/* eslint-disable no-console */
import 'reflect-metadata';
import './shared/database';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './shared/routes';
import AppError from './shared/errors/AppError';

const app = express();

app.use(express.json());

app.use(routes);

app.get('/', (request, response) => {
  response.json({ message: 'Welcome to conexia API' });
});

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.httpStatusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.info('Server started');
});
