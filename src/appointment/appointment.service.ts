import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentRepository } from './appointment.repository';
import { GetAppointmentsDto } from './dto/getAppointments.dto';
import { Stylist } from '../auth/stylist.entity';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { getRepository } from 'typeorm';
import { Service } from '../service/service.entity';
import { AppointmentStatus } from './appointment-status.enum';
import { FormulaRepository } from '../formula/formula.repository';
import { AddFormulaToAppointmentDto } from './dto/addFormulaToAppointment.dto';
import { CreateFormulaDto } from 'src/formula/dto/create-formula.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentRepository)
    private appointmentRepo: AppointmentRepository,
    @InjectRepository(FormulaRepository)
    private formulaRepo: FormulaRepository,
  ) {
  }

  // READ
  getAppointments(filterDto: GetAppointmentsDto, stylist: Stylist): Promise<Appointment[]> {
    return this.appointmentRepo.getAppointments(filterDto, stylist);
  }

  async getAppointmentById(id: number, stylist: Stylist): Promise<Appointment> {
    const found = await this.appointmentRepo.findOne({ where: { id, stylistId: stylist.id } });

    if (!found) {
      throw new NotFoundException(`Appointment with ID "${id}" not found.`);
    }

    return found;
  }

  // CREATE
  createAppointment(appointmentInfo: CreateAppointmentDto, stylist: Stylist): Promise<Appointment> {
    return this.appointmentRepo.createAppointment(appointmentInfo, stylist);
  }

  // DELETE
  async deleteAppointment(id: number, stylist: Stylist): Promise<void> {
    const result = await this.appointmentRepo.delete({ id, stylistId: stylist.id });

    if (result.affected === 0) {
      throw new InternalServerErrorException(`Task with ID "${id}" was not found.`);
    }
  }

  // UPDATE
  async updateAppointmentStatus(id: number, stylist: Stylist, status: AppointmentStatus): Promise<Appointment> {
    const appointment = await this.getAppointmentById(id, stylist);

    if (status !== AppointmentStatus[status]) {
      throw new InternalServerErrorException(`Invalid status.`);
    }

    appointment.status = status;
    await appointment.save();

    return appointment;
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

  async addServiceToAppointment(id: number, stylist: Stylist, serviceId: number): Promise<Appointment> {
    const appointment = await this.getAppointmentById(id, stylist);

    const found = appointment.services.find(s => s.id === serviceId);

    if (found) {
      throw new InternalServerErrorException(`Service with ID "${serviceId}" already exists for this appointment.`);
    }

    const serviceRepo = getRepository(Service);
    const service = await serviceRepo.findOne({ where: { id: serviceId, stylistId: stylist.id } });

    if (!service) {
      throw new InternalServerErrorException(`Service with ID "${serviceId}" does not exist.`);
    }

    appointment.services.push(service);

    const endDate = new Date(appointment.end);
    endDate.setMinutes(endDate.getMinutes() + service.length);
    appointment.end = endDate.toISOString();

    await appointment.save();

    return appointment;
  }

  async removeServiceFromAppointment(id: number, stylist: Stylist, serviceId: number): Promise<Appointment> {
    const appointment = await this.getAppointmentById(id, stylist);
    let serviceFound = false;
    let removedLength = 0;

    appointment.services = appointment.services.filter(service => {
      if (service.id === serviceId) {
        serviceFound = true;
        removedLength = service.length;
        return false;
      } else {
        return true;
      }
    });

    if (!serviceFound) {
      throw new NotFoundException(`No service with ID "${serviceId}" found.`);
    }

    const endDate = new Date(appointment.end);
    endDate.setMinutes(endDate.getMinutes() - removedLength);
    appointment.end = endDate.toISOString();

    await appointment.save();

    return appointment;
  }

  async addFormulaToAppointment(formulaInfo: CreateFormulaDto, stylist: Stylist, appointmentId: number): Promise<Appointment> {
    const appointment = await this.appointmentRepo.findOne({ where: { id: appointmentId, stylistId: stylist.id }});
    const client = appointment.client;
    const formula = await this.formulaRepo.createFormula(formulaInfo, stylist);

    appointment.formulas.push(formula);
    client.formulas.push(formula);

    await appointment.save();
    await client.save();

    return appointment;
  }

  async removeFormulaFromAppointment(formulaId: number, stylist: Stylist, appointmentId: number): Promise<Appointment> {
    await this.formulaRepo.deleteFormula(formulaId, stylist);

    const appointment = await this.appointmentRepo.findOne({ where: { id: appointmentId, stylistId: stylist.id }});
    return appointment;
  }
}
