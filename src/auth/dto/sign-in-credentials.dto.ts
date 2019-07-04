import { IsString, MinLength, MaxLength, Matches, IsEmail } from 'class-validator';

export class SignInCredentialsDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @Matches(/^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,100}/,
    { message: 'Password too weak.'})
  password: string;
}
