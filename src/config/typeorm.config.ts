import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const isTest = process.env.NODE_ENV === 'test';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_URL,
  port: 5432,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: isTest ? process.env.TEST_DATABASE : process.env.DATABASE,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
