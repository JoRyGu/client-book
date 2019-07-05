import { IsNotEmpty, IsEmail } from 'class-validator';
import { DateInput } from '../../helpers/dateInput';

export class CreateClientDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  birthday: DateInput;
}
