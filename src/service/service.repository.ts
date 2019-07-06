import { Repository, EntityRepository } from 'typeorm';
import { Service } from './service.entity';
import { Stylist } from '../auth/stylist.entity';
import { CreateServiceDto } from './dto/createService.dto';
import { GetServicesFilterDto } from './dto/getServicesFilter.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Service)
export class ServiceRepository extends Repository<Service> {
  async getServices(filters: GetServicesFilterDto, stylist: Stylist): Promise<Service[]> {
    const { name, isPublic } = filters;
    const query = this.createQueryBuilder('services');

    query.where('services.stylistId = :stylistId', { stylistId: stylist.id });

    if (name) {
      query.andWhere(
        'LOWER(services.name) LIKE LOWER(:name)', { name: `%${name}%`},
      );
    }

    if (isPublic) {
      const myBool = (isPublic === 'true');
      query.andWhere(
        'services.isPublic = :myBool', { myBool },
      );
    }

    query.orderBy('name', 'ASC');

    try {
      const services = await query.getMany();
      return services;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async createService(serviceInfo: CreateServiceDto, stylist: Stylist): Promise<Service> {
    const { name, price, length, isPublic } = serviceInfo;

    const service = new Service();
    service.name = name;
    service.price = price;
    service.length = length;
    service.isPublic = isPublic;
    service.stylist = stylist;

    await service.save();

    delete service.stylist;

    return service;
  }
}
