import mongoose from 'mongoose';

import mongoConfig from './config/config';

const mongoCredentials = mongoConfig.username
  ? `${mongoConfig.username}:${mongoConfig.password}@`
  : '';

if (!process.env.MONGO_URL) {
  mongoose
    .connect(
      `mongodb://${mongoCredentials}${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
    )
    .then(() => {
      console.log('Connected successfully');
    })
    .catch(err => console.log(`Connection failed: ${err}`));
}