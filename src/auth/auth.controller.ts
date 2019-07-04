import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';
import { JwtResponseToken } from './jwt-response-token.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  SignUpCredentialsDto(@Body(ValidationPipe) authCredentials: SignUpCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentials);
  }

  @Post('sign-in')
  signIn(@Body(ValidationPipe) authCredentials: SignInCredentialsDto): Promise<JwtResponseToken> {
    return this.authService.signIn(authCredentials);
  }
}
