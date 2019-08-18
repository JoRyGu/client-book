import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { getManager, EntityManager } from 'typeorm';
import axios from 'axios';

import { AppModule } from '../../src/app.module';
import clearTables from '../helpers/clearTables';
import { createJohnDoe, signInJohnDoe } from '../helpers/mockInputData';
import { Stylist } from '../../src/auth/stylist.entity';

describe('Auth Routes', () => {
  let app: INestApplication;
  let manager: EntityManager;

  const baseEndpoint = axios.create({ baseURL: 'http://localhost:3000/auth' });
  const johnDoeSignup = createJohnDoe;
  const johnDoeSignIn = signInJohnDoe;
  const test = 0;

  beforeAll(async () => {
    app = await NestFactory.create(AppModule, { logger: false });
    manager = getManager();
    await app.listen(3000);
  });

  beforeEach(async () => {
    await clearTables(['stylists']);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST auth/signup', () => {
    it('should respond with a "201:CREATED" status when sent with valid data', async () => {
      const res = await baseEndpoint.post('/signup', johnDoeSignup);

      expect(res.status).toBe(201);
    });

    it('should create a new stylist in the "stylists" table in the database', async () => {
      await baseEndpoint.post('/signup', johnDoeSignup);

      return expect(manager.findOne(Stylist, 1)).resolves.toHaveProperty(
        'firstName',
        'John',
      );
    });

    it('should respond with a "409:CONFLICT" status when sent a duplicate email address', async () => {
      await baseEndpoint.post('/signup', johnDoeSignup);

      return expect(
        baseEndpoint.post('/signup', johnDoeSignup),
      ).rejects.toHaveProperty('response.status', 409);
    });

    it('should respond with a "400:BAD REQUEST" status when sent an invalid email address', async () => {
      const invalid = { ...johnDoeSignup };
      invalid.email = 'i am not an email address';

      return expect(
        baseEndpoint.post('/signup', invalid),
      ).rejects.toHaveProperty('response.status', 400);
    });

    it('should respond with a "400:BAD REQUEST" status when sent a first name longer than 40 characters', async () => {
      const invalid = { ...johnDoeSignup };
      invalid.firstName =
        'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz';

      return expect(
        baseEndpoint.post('/signup', invalid),
      ).rejects.toHaveProperty('response.status', 400);
    });

    it('should respond with a "400:BAD REQUEST" status when sent a last name longer than 40 characters', async () => {
      const invalid = { ...johnDoeSignup };
      invalid.lastName = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz';

      return expect(
        baseEndpoint.post('/signup', invalid),
      ).rejects.toHaveProperty('response.status', 400);
    });

    it('should respond with a "400:BAD REQUEST" status when sent a password that does not contain at least one number and one special character [!@#$%]', async () => {
      const invalid = { ...johnDoeSignup };
      invalid.password = 'PaSsWoRd';

      return expect(
        baseEndpoint.post('/signup', invalid),
      ).rejects.toHaveProperty('response.status', 400);
    });

    it('should respond with a "400:BAD REQUEST" status when sent a password that is less than 8 characters', async () => {
      const invalid = { ...johnDoeSignup };
      invalid.password = 'pA1$w0r';

      return expect(
        baseEndpoint.post('/signup', invalid),
      ).rejects.toHaveProperty('response.status', 400);
    });
  });
});
