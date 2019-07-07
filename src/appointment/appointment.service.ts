import { Injectable, Body, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentRepository } from './appointment.repository';
import { GetAppointmentsDto } from './dto/getAppointments.dto';
import { Stylist } from '../auth/stylist.entity';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/createAppointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentRepository)
    private appointmentRepo: AppointmentRepository,
  ) {}

  getAppointments(filterDto: GetAppointmentsDto, stylist: Stylist): Promise<Appointment[]> {
    return this.appointmentRepo.getAppointments(filterDto, stylist);
  }

  async getAppointmentById(id: number, stylist: Stylist): Promise<Appointment> {
    const found = await this.appointmentRepo.findOne({ where: { id, stylistId: stylist.id }});

    if (!found) {
      throw new NotFoundException(`Appointment with ID "${id}" not found.`);
    }

    return found;
  }

  createAppointment(appointmentInfo: CreateAppointmentDto, stylist: Stylist): Promise<Appointment> {
    return this.appointmentRepo.createAppointment(appointmentInfo, stylist);
  }

  async deleteAppointment(id: number, stylist: Stylist): Promise<void> {
    const result = await this.appointmentRepo.delete({ id, stylistId: stylist.id });

    if (result.affected === 0) {
      throw new InternalServerErrorException(`Task with ID "${id}" was not found.`);
    }
  }

  async updateAppointmentDate(id: number, stylist: Stylist, newDate: string) {
    const appointment = await this.getAppointmentById(id, stylist);

    const startDate = new Date(appointment.start);
    const endDate = new Date(appointment.end);
    const diff = (endDate.getTime() - startDate.getTime());

    const updatedStart = new Date(newDate);
    const updatedEnd = new Date(updatedStart.getTime() + diff);

    appointment.start = updatedStart.toISOString();
    appointment.end = updatedEnd.toISOString();
    await appointment.save();

    return appointment;
  }
}
