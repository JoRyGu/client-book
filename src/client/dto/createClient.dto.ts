import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';
import { DateInput } from '../../helpers/dateInput';

export class CreateClientDto {
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  birthday: DateInput;
}
