import { EntityRepository, Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Stylist } from '../auth/stylist.entity';
import { GetAppointmentsDto } from './dto/getAppointments.dto';
import { InternalServerErrorException } from '@nestjs/common';

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
    }

    try {
      const appointments = await query.getMany();
      return appointments;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
