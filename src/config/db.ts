import mongoose from 'mongoose';

import { Logger } from '../logging/logger';

export async function connect(): Promise<typeof mongoose> {
  const db = await mongoose
    .connect(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/milkshake')
    .then((conn) => {
      Logger.log('Connected to MongoDB');
      return conn;
    });
  return db;
}
