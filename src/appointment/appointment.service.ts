import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentRepository } from './appointment.repository';
import { GetAppointmentsDto } from './dto/getAppointments.dto';
import { Stylist } from '../auth/stylist.entity';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentRepository)
    private appointmentRepo: AppointmentRepository,
  ) {}

  getAppointments(filterDto: GetAppointmentsDto, stylist: Stylist): Promise<Appointment[]> {
    return this.appointmentRepo.getAppointments(filterDto, stylist);
  }
}
