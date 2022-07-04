import 'dotenv/config';
import 'express-async-errors';
import './shared/database';

import express, { Request, Response, NextFunction } from 'express';

import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errors());

app.use((request: Request, response: Response, _: NextFunction) => {
  return response.status(404).send('Unable to find the requested resource!');
});

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json(err);
  }

  console.error(err);

if(err) {
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
});

export default app;