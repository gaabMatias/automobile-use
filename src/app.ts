import { config } from 'dotenv';
import 'express-async-errors';

import { Request, Response } from 'express';
import * as express from 'express'
import * as cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from './errors/AppError';

import * as mongoose from 'mongoose';




const app = express();
config()

if(process.env.MONGO_URL !== undefined) {
  console.log(process.env.MONGO_URL)
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected successfully');
  })
  .catch(err => console.log(`Connection failed: ${err}`));
}

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errors());

app.use((request: Request, response: Response) => {
  return response.status(404).send('Unable to find the requested resource!');
});

app.use((err: Error, request: Request, response: Response) => {
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