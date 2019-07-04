import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StylistRepository } from './stylist.repository';
import { JwtService } from '@nestjs/jwt';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';
import { JwtResponseToken } from './jwt-response-token.interface';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(StylistRepository)
    private stylistRepo: StylistRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentials: SignUpCredentialsDto): Promise<void> {
    return this.stylistRepo.signUp(authCredentials);
  }

  async signIn(authCredentials: SignInCredentialsDto): Promise<JwtResponseToken> {
    const email = await this.stylistRepo.validatePassword(authCredentials);

    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

}
