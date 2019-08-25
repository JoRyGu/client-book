import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { getManager, EntityManager } from 'typeorm';
import axios from 'axios';

import { AppModule } from '../../src/app.module';
import clearTables from '../helpers/clearTables';
import {
  createJohnDoe,
  signInJohnDoe,
  createClient,
} from '../helpers/mockInputData';
import { Stylist } from '../../src/auth/stylist.entity';
import { Client } from '../../src/client/client.entity';

describe('Client Routes', () => {
  let app: INestApplication;
  let manager: EntityManager;
  let token: string;
  let headers: { Authorization: string };

  const baseEndpoint = axios.create({
    baseURL: 'http://localhost:3000/clients',
  });

  beforeAll(async () => {
    app = await NestFactory.create(AppModule, { logger: false });
    manager = getManager();
    await app.listen(3000);

    await clearTables(['stylists']);
    await axios.post('http://localhost:3000/auth/signup', createJohnDoe);
    const res = await axios.post(
      'http://localhost:3000/auth/sign-in',
      signInJohnDoe,
    );
    token = res.data.accessToken;
    headers = { Authorization: `Bearer ${token}` };
  });

  afterAll(async () => {
    setTimeout(() => null, 500);
    await app.close();
  });

  describe('GET /clients', () => {
    beforeEach(async () => {
      await clearTables(['clients']);
    });

    it('should respond with a "200:OK" status when clients are retrieved successfully', async () => {
      const res = await baseEndpoint.post('', createClient, { headers });
      const clients = await baseEndpoint.get('', { headers });

      console.log(JSON.stringify(clients.data));

      expect(clients.status).toBe(200);
    });

    it('should return an array of client objects when retrieved successfully', async () => {
      await baseEndpoint.post('', createClient, { headers });
      const clients = await baseEndpoint.get('', { headers });

      expect(clients.data).toBeInstanceOf(Array);
    });

    it('should respond with a "401:UNAUTHORIZED" status when no token is passed via an Authorization header', async () => {
      await baseEndpoint.post('', createClient, { headers });

      try {
        await baseEndpoint.get('');
      } catch (err) {
        expect(err.response.status).toBe(401);
      }
    });

    it('should respond with a "401:UNAUTHORIZED" status when an incorrect token is passed via an Authorization header', async () => {
      await baseEndpoint.post('', createClient, { headers });

      try {
        await baseEndpoint.get('', {
          headers: { Authorization: 'Bearer 3k389dj3j2kdkn3kjd98' },
        });
      } catch (err) {
        expect(err.response.status).toBe(401);
      }
    });
  });
});
