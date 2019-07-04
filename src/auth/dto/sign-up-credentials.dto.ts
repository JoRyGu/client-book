import { SignInCredentialsDto } from './sign-in-credentials.dto';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class SignUpCredentialsDto extends SignInCredentialsDto {
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  firstName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(40)
  lastName: string;
}
