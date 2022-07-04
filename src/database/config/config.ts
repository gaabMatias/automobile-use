interface MongoConfig {
  host: string;
  port: number;
  username?: string;
  password?: string;
  database: string;
}

export default {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 27017,
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  database: process.env.MONGO_DB || 'automobile-use',
} as MongoConfig;