import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: parseInt(process.env.PORT, 10),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
