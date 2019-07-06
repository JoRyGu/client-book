import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceRepository } from './service.repository';
import { CreateServiceDto } from './dto/createService.dto';
import { Stylist } from '../auth/stylist.entity';
import { Service } from './service.entity';
import { GetServicesFilterDto } from './dto/getServicesFilter.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceRepository)
    private serviceRepo: ServiceRepository,
  ) {}

  getServices(filter: GetServicesFilterDto, stylist: Stylist): Promise<Service[]> {
    return this.serviceRepo.getServices(filter, stylist);
  }

  async getServiceById(id: number, stylist: Stylist): Promise<Service> {
    const service = await this.serviceRepo.findOne({ where: { id, stylistId: stylist.id }});

    if (!service) {
      throw new NotFoundException(`Service with id "${id}" not found.`);
    }

    return service;
  }

  createService(serviceInfo: CreateServiceDto, stylist: Stylist): Promise<Service> {
    return this.serviceRepo.createService(serviceInfo, stylist);
  }

  async deleteService(id: number, stylist: Stylist): Promise<void> {
    const result = await this.serviceRepo.delete({ id, stylistId: stylist.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Service with id "${id}" not found.`);
    }
  }

  async updateServiceName(id: number, name: string, stylist: Stylist): Promise<Service> {
    const service = await this.getServiceById(id, stylist);

    service.name = name;
    await service.save();

    delete service.stylist;

    return service;
  }

  async updateServicePrice(id: number, price: number, stylist: Stylist): Promise<Service> {
    const service = await this.getServiceById(id, stylist);

    service.price = price;
    await service.save();

    delete service.stylist;

    return service;
  }

  async updateServiceLength(id: number, length: number, stylist: Stylist): Promise<Service> {
    const service = await this.getServiceById(id, stylist);

    service.length = length;
    await service.save();

    delete service.stylist;

    return service;
  }

  async updateServiceIsPublic(id: number, stylist: Stylist): Promise<Service> {
    const service = await this.getServiceById(id, stylist);

    service.isPublic = !service.isPublic;
    await service.save();

    delete service.stylist;

    return service;
  }
}
