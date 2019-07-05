import { Controller, Get, Query, ValidationPipe, UseGuards, Post, UsePipes, Body, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { ClientService } from './client.service';
import { GetClientsFilterDto } from './dto/getClientsFilter.dto';
import { Stylist } from '../auth/stylist.entity';
import { GetStylist } from '../auth/getStylist.decorator';
import { Client } from './client.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateClientDto } from './dto/createClient.dto';
import { UpdateClientDto } from './dto/updateClient.dto';

@Controller('clients')
@UseGuards(AuthGuard())
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get()
  getClients(
    @Query(ValidationPipe) filterDto: GetClientsFilterDto,
    @GetStylist() stylist: Stylist,
  ): Promise<Client[]> {
    return this.clientService.getClients(filterDto, stylist);
  }

  @Get(':id')
  getClientById(
    @Param('id', ParseIntPipe)
    id: number,
    @GetStylist() stylist: Stylist,
  ): Promise<Client> {
    return this.clientService.getClientById(id, stylist);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createClient(
    @Body() clientInput: CreateClientDto,
    @GetStylist() stylist: Stylist,
  ): Promise<Client> {
    return this.clientService.createClient(clientInput, stylist);
  }

  @Delete(':id')
  deleteClient(
    @Param('id', ParseIntPipe) id: number,
    @GetStylist() stylist: Stylist,
  ): Promise<void> {
    return this.clientService.deleteClient(id, stylist);
  }

  @Put(':id')
  updateClient(
    @Param('id', ParseIntPipe) id: number,
    @Body() clientInput: UpdateClientDto,
    @GetStylist() stylist: Stylist,
  ): Promise<Client> {
    return this.clientService.updateClient(id, clientInput, stylist);
  }
}
