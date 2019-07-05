import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientRepository } from './client.repository';
import { GetClientsFilterDto } from './dto/getClientsFilter.dto';
import { Stylist } from '../auth/stylist.entity';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/createClient.dto';
import { UpdateClientDto } from './dto/updateClient.dto';
import { convertToDateString } from '../helpers/convertToDateString';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientRepository)
    private clientRepo: ClientRepository,
  ) {}

  getClients(filterDto: GetClientsFilterDto, stylist: Stylist): Promise<Client[]> {
    return this.clientRepo.getClients(filterDto, stylist);
  }

  async getClientById(id: number, stylist: Stylist): Promise<Client> {
    const found = await this.clientRepo.findOne({ where: { id, stylistId: stylist.id }});

    if (!found) {
      throw new NotFoundException(`Client with ID "${id}" not found.`);
    }

    return found;
  }

  createClient(clientInfo: CreateClientDto, stylist: Stylist): Promise<Client> {
    return this.clientRepo.createClient(clientInfo, stylist);
  }

  async deleteClient(id: number, stylist: Stylist): Promise<void> {
    const result = await this.clientRepo.delete({ id, stylistId: stylist.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }
  }

  async updateClient(id: number, updateInfo: UpdateClientDto, stylist: Stylist): Promise<Client> {
    const { name, phoneNumber, email, birthday, lastVisit } = updateInfo;
    const client = await this.getClientById(id, stylist);

    if (name) { client.name = name; }
    if (phoneNumber) { client.phoneNumber = phoneNumber; }
    if (email) { client.email = email; }
    if (birthday) { client.birthday = convertToDateString(birthday); }
    if (lastVisit) { client.lastVisit = convertToDateString(lastVisit); }

    await client.save();
    return client;
  }
}
