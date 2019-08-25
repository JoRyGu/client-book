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

      expect(clients.status).toBe(200);
    });

    it('should return an array of client objects when retrieved successfully', async () => {
      await baseEndpoint.post('', createClient, { headers });
      const clients = await baseEndpoint.get('', { headers });

      expect(clients.data).toBeInstanceOf(Array);
    });

    it('should respond with a "401:UNAUTHORIZED" status when no token is passed via an Authorization header', async () => {
      await baseEndpoint.post('', createClient, { headers });

      return expect(baseEndpoint.get('')).rejects.toHaveProperty(
        'response.status',
        401,
      );
    });

    it('should respond with a "401:UNAUTHORIZED" status when an incorrect token is passed via an Authorization header', async () => {
      await baseEndpoint.post('', createClient, { headers });

      return expect(
        baseEndpoint.get('', {
          headers: { Authorization: 'Bearer 3234234234322bnbn' },
        }),
      ).rejects.toHaveProperty('response.status', 401);
    });
  });

  describe('GET /clients/{id}', () => {
    beforeEach(async () => {
      await clearTables(['clients']);
    });

    it('should respond with a "200:OK" status when client is retreived successfully', async () => {
      await baseEndpoint.post('', createClient, { headers });
      const clients = await baseEndpoint.get('/1', { headers });

      expect(clients.status).toBe(200);
    });

    it('should return a single client object, not an array', async () => {
      await baseEndpoint.post('', createClient, { headers });
      const clients = await baseEndpoint.get('/1', { headers });

      expect(clients.data).not.toBeInstanceOf(Array);
    });

    it('should respond with a "401:UNAUTHORIZED" status when no token is passed via an Authorization header', async () => {
      await baseEndpoint.post('', createClient, { headers });

      return expect(baseEndpoint.get('/1')).rejects.toHaveProperty(
        'response.status',
        401,
      );
    });

    it('should respond with a "401:UNAUTHORIZED" status when an incorrect token is passed via an Authorization header', async () => {
      await baseEndpoint.post('', createClient, { headers });

      return expect(
        baseEndpoint.get('/1', {
          headers: { Authorization: 'lsdlkfajklei8d83n;ldkn3' },
        }),
      ).rejects.toHaveProperty('response.status', 401);
    });
  });

  describe('POST /clients', () => {
    beforeEach(async () => {
      await clearTables(['clients']);
    });

    it('should respond with a "201:CREATED" status when client is created successfully', async () => {
      const newClient = await baseEndpoint.post('', createClient, { headers });

      expect(newClient.status).toBe(201);
    });

    it('should return the newly created client as a client object', async () => {
      const newClient = await baseEndpoint.post('', createClient, { headers });

      expect(newClient.data).toHaveProperty('name', 'Keanu Reaves');
    });

    it('should respond with a "400:BAD REQUEST" status when the name property is blank', async () => {
      const invalid = { ...createClient };
      invalid.name = '';

      return expect(
        baseEndpoint.post('', invalid, { headers }),
      ).rejects.toHaveProperty('response.status', 400);
    });

    it('should respond with a "400:BAD REQUEST" status when the phone number property is less than 10 characters', async () => {
      const invalid = { ...createClient };
      invalid.phoneNumber = '123';

      return expect(
        baseEndpoint.post('', invalid, { headers }),
      ).rejects.toHaveProperty('response.status', 400);
    });

    it('should respond with a "400:BAD REQUEST" status when the phone number property is more than 10 characters', async () => {
      const invalid = { ...createClient };
      invalid.phoneNumber = '1234567890123';

      return expect(
        baseEndpoint.post('', invalid, { headers }),
      ).rejects.toHaveProperty('response.status', 400);
    });
  });
});
