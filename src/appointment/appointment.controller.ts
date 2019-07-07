import { Controller, UseGuards, Get, Query, ValidationPipe, Post, Body, Delete, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppointmentService } from './appointment.service';
import { GetAppointmentsDto } from './dto/getAppointments.dto';
import { GetStylist } from '../auth/getStylist.decorator';
import { Stylist } from '../auth/stylist.entity';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/createAppointment.dto';

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

  @Get(':id')
  getAppointmentById(
    @Param('id', ParseIntPipe) id: number,
    @GetStylist() stylist: Stylist,
  ): Promise<Appointment> {
    return this.appointmentService.getAppointmentById(id, stylist);
  }

  @Post()
  createAppointment(
    @Body() appointmentInfo: CreateAppointmentDto,
    @GetStylist() stylist: Stylist,
  ): Promise<Appointment> {
    return this.appointmentService.createAppointment(appointmentInfo, stylist);
  }

  @Delete(':id')
  deleteAppointment(
    @Param('id', ParseIntPipe) id: number,
    @GetStylist() stylist: Stylist,
  ): Promise<void> {
    return this.appointmentService.deleteAppointment(id, stylist);
  }

  @Patch(':id/date')
  updateAppointmentDate(
    @Param('id', ParseIntPipe) id: number,
    @GetStylist() stylist: Stylist,
    @Body('date') newDate: string,
  ) {
    return this.appointmentService.updateAppointmentDate(id, stylist, newDate);
  }
}
