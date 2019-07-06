import { Controller, UseGuards, Get, Query, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppointmentService } from './appointment.service';
import { GetAppointmentsDto } from './dto/getAppointments.dto';
import { GetStylist } from '../auth/getStylist.decorator';
import { Stylist } from '../auth/stylist.entity';
import { Appointment } from './appointment.entity';

@Controller('appointments')
@UseGuards(AuthGuard())
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Get()
  getAppointments(
    @Query(ValidationPipe) filterDto: GetAppointmentsDto,
    @GetStylist() stylist: Stylist,
  ): Promise<Appointment[]> {
    return this.appointmentService.getAppointments(filterDto, stylist);
  }
}
