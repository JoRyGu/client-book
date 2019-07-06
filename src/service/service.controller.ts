import { Controller, Body, Post, UsePipes, ValidationPipe, UseGuards, Get, Query, Delete, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/createService.dto';
import { Stylist } from '../auth/stylist.entity';
import { Service } from './service.entity';
import { GetStylist } from '../auth/getStylist.decorator';
import { AuthGuard } from '@nestjs/passport';
import { GetServicesFilterDto } from './dto/getServicesFilter.dto';

@Controller('services')
@UseGuards(AuthGuard())
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @Get()
  getServices(
    @Query(ValidationPipe) filter: GetServicesFilterDto,
    @GetStylist() stylist: Stylist,
  ): Promise<Service[]> {
    return this.serviceService.getServices(filter, stylist);
  }

  @Get(':id')
  getServiceById(
    @Param('id', ParseIntPipe) id: number,
    @GetStylist() stylist: Stylist,
  ): Promise<Service> {
    return this.serviceService.getServiceById(id, stylist);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createService(
    @Body() serviceInfo: CreateServiceDto,
    @GetStylist() stylist: Stylist,
  ): Promise<Service> {
    return this.serviceService.createService(serviceInfo, stylist);
  }

  @Delete(':id')
  deleteService(
    @Param('id', ParseIntPipe) id: number,
    @GetStylist() stylist: Stylist,
  ): Promise<void> {
    return this.serviceService.deleteService(id, stylist);
  }

  @Patch(':id/name')
  updateServiceName(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
    @GetStylist() stylist: Stylist,
  ): Promise<Service> {
    return this.serviceService.updateServiceName(id, name, stylist);
  }

  @Patch(':id/price')
  updateServicePrice(
    @Param('id', ParseIntPipe) id: number,
    @Body('price') price: number,
    @GetStylist() stylist: Stylist,
  ): Promise<Service> {
    return this.serviceService.updateServicePrice(id, price, stylist);
  }

  @Patch(':id/length')
  updateServiceLength(
    @Param('id', ParseIntPipe) id: number,
    @Body('length') length: number,
    @GetStylist() stylist: Stylist,
  ): Promise<Service> {
    return this.serviceService.updateServiceLength(id, length, stylist);
  }

  @Patch(':id/is-public')
  updateServiceIsPublic(
    @Param('id', ParseIntPipe) id: number,
    @GetStylist() stylist: Stylist,
  ): Promise<Service> {
    return this.serviceService.updateServiceIsPublic(id, stylist);
  }
}
