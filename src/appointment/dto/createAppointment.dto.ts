import { AppointmentStatus } from '../appointment-status.enum';

export class CreateAppointmentDto {
  start: string;
  clientPhoneNumber: string;
  status: AppointmentStatus;
  serviceIds: number[];
}
