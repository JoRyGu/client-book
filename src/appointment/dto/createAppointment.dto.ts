import { AppointmentStatus } from '../appointment-status.enum';

export class CreateAppointmentDto {
  date: string;
  clientPhoneNumber: string;
  status: AppointmentStatus;
}
