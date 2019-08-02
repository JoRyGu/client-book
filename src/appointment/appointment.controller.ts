import { Controller, UseGuards, Get, Query, ValidationPipe, Post, Body, Delete, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppointmentService } from './appointment.service';
import { GetAppointmentsDto } from './dto/getAppointments.dto';
import { GetStylist } from '../auth/getStylist.decorator';
import { Stylist } from '../auth/stylist.entity';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { AppointmentStatus } from './appointment-status.enum';
import { CreateFormulaDto } from '../formula/dto/create-formula.dto';

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

  @Patch(':id/status')
  updateAppointmentStatus(
    @Param('id', ParseIntPipe) id: number,
    @GetStylist() stylist: Stylist,
    @Body('status') newStatus: AppointmentStatus,
  ): Promise<Appointment> {
    return this.appointmentService.updateAppointmentStatus(id, stylist, newStatus);
  }

  @Patch(':id/date')
  updateAppointmentDate(
    @Param('id', ParseIntPipe) id: number,
    @GetStylist() stylist: Stylist,
    @Body('date') newDate: string,
  ) {
    return this.appointmentService.updateAppointmentDate(id, stylist, newDate);
  }

  @Post(':id/services')
  addServiceToAppointment(
    @Param('id', ParseIntPipe) id: number,
    @GetStylist() stylist: Stylist,
    @Body('serviceId') serviceId: number,
  ): Promise<Appointment> {
    return this.appointmentService.addServiceToAppointment(id, stylist, serviceId);
  }

  @Delete(':id/services/:serviceId')
  removeServiceFromAppointment(
    @Param('id', ParseIntPipe) id: number,
    @GetStylist() stylist: Stylist,
    @Param('serviceId', ParseIntPipe) serviceId: number,
  ): Promise<Appointment> {
    return this.appointmentService.removeServiceFromAppointment(id, stylist, serviceId);
  }

  @Post(':id/formulas')
  addFormulaToAppointment(
    @Body() formulaInfo: CreateFormulaDto,
    @GetStylist() stylist: Stylist,
    @Param('id', ParseIntPipe) appointmentId: number,
  ): Promise<Appointment> {
    return this.appointmentService.addFormulaToAppointment(formulaInfo, stylist, appointmentId);
  }

  @Delete(':id/formulas/:formulaId')
  removeFormulaFromAppointment(
    @Param('id', ParseIntPipe) appointmentId: number,
    @Param('formulaId', ParseIntPipe) formulaId: number,
    @GetStylist() stylist: Stylist,
  ): Promise<Appointment> {
    return this.appointmentService.removeFormulaFromAppointment(formulaId, stylist, appointmentId);
  }
}
