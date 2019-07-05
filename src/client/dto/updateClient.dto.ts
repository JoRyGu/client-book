import { DateInput } from '../../helpers/dateInput';

export class UpdateClientDto {
  name: string;
  phoneNumber: string;
  email: string;
  birthday: DateInput;
  lastVisit: DateInput;
}
