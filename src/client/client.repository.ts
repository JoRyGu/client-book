import { EntityRepository, Repository } from 'typeorm';
import { Client } from './client.entity';
import { GetClientsFilterDto } from './dto/getClientsFilter.dto';
import { Stylist } from '../auth/stylist.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateClientDto } from './dto/createClient.dto';
import { convertToDateString } from '../helpers/convertToDateString';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  async getClients(filterDto: GetClientsFilterDto, stylist: Stylist): Promise<Client[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('clients');

    query.where('clients.stylistId = :stylistId', { stylistId: stylist.id });

    if (search) {
      query.andWhere(
        '(LOWER(clients.name) LIKE LOWER(:search) OR clients.phoneNumber LIKE :search OR LOWER(clients.email) LIKE LOWER(:search))',
        { search: `%${search}%`},
      );
    }

    query.orderBy('name', 'ASC');

    try {
      const clients = await query.getMany();
      return clients;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async createClient(clientInfo: CreateClientDto, stylist: Stylist): Promise<Client> {
    const { name, phoneNumber, email, birthday } = clientInfo;

    const client = new Client();
    client.name = name;
    client.phoneNumber = phoneNumber;
    client.email = email;
    client.stylist = stylist;

    if (birthday && birthday.month) {
      client.birthday = convertToDateString(birthday);
    }

    await client.save();

    delete client.stylist;

    return client;
  }
}
