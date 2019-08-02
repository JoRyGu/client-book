import { EntityRepository, Repository, getRepository, Any } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Stylist } from '../auth/stylist.entity';
import { GetAppointmentsDto } from './dto/getAppointments.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { Client } from '../client/client.entity';
import { Service } from '../service/service.entity';
import { AppointmentStatus } from './appointment-status.enum';

@EntityRepository(Appointment)
export class AppointmentRepository extends Repository<Appointment> {
  async getAppointments(filterDto: GetAppointmentsDto, stylist: Stylist): Promise<Appointment[]> {
    const { search, status } = filterDto;

    const query = this.createQueryBuilder('appointments');
    query.where('appointments.stylistId = :stylistId', { stylistId: stylist.id });

    if (search) {
      // search code here...
    }

    if (status) {
      // status code here...
      query.andWhere('appointments.status = :status', { status: status.toUpperCase() });
    }

    try {
      const appointments = await query.getMany();
      return appointments;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async createAppointment(appointmentInfo: CreateAppointmentDto, stylist: Stylist): Promise<Appointment> {
    const { start, clientPhoneNumber, status, serviceIds } = appointmentInfo;

    if (status && !AppointmentStatus[status]) {
      throw new InternalServerErrorException('Invalid Status Entered.');
    }

    const clientRepo = getRepository(Client);
    const client = await clientRepo.findOne({ where: { phoneNumber: clientPhoneNumber, stylistId: stylist.id }});

    const serviceRepo = getRepository(Service);
    const services = await serviceRepo.find({ id: Any(serviceIds)});

    let appointmentLength = 0;
    services.forEach(service => appointmentLength += service.length);

    const endDate = new Date(start);
    endDate.setMinutes(endDate.getMinutes() + appointmentLength);

    if (!client) {
      throw new NotFoundException(`Client with phone number "${clientPhoneNumber}" not found.`);
    }

    const appointment = new Appointment();
    appointment.start = start;
    appointment.end = endDate.toISOString();

    if (status) {
      appointment.status = status;
    }

    appointment.client = client;
    appointment.stylist = stylist;
    appointment.services = services;
    await appointment.save();

    delete appointment.stylist;

    return appointment;
  }
}
