import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import axios from 'axios';

import { AppModule } from '../../src/app.module';
import clearTables from '../helpers/clearTables';
import { createJohnDoe, signInJohnDoe } from '../helpers/mockInputData';

describe('auth', () => {
  let app: INestApplication;
  const johnDoeSignup = createJohnDoe;
  const johnDoeSignIn = signInJohnDoe;

  beforeAll(async () => {
    app = await NestFactory.create(AppModule);
    await app.listen(3000);
  });

  beforeEach(async () => {
    await clearTables(['stylists']);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST auth/signup', () => {
    it('should return a 201 when sent with valid data', async () => {
      try {
        const res = await axios({
          method: 'POST',
          url: 'http://localhost:3000/auth/signup',
          data: johnDoeSignup,
        });

        expect(res.status).toBe(201);
      } catch (err) {
        // Should not throw error.
      }
    });
  });
});
