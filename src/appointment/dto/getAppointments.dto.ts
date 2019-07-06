import { AppointmentStatus } from "../appointment-status.enum";

export class GetAppointmentsDto {
  search: string;
  status: AppointmentStatus;
}
