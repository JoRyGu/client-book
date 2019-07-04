import { EntityRepository, Repository } from 'typeorm';
import { Stylist } from './stylist.entity';
import * as bcrypt from 'bcryptjs';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';

@EntityRepository(Stylist)
export class StylistRepository extends Repository<Stylist> {
  async signUp(authCredentials: SignUpCredentialsDto): Promise<void> {
    const { firstName, lastName, email, password } = authCredentials;
    const salt = await bcrypt.genSalt();

    const stylist = new Stylist();
    stylist.firstName = firstName;
    stylist.lastName = lastName;
    stylist.email = email;
    stylist.password = await bcrypt.hash(password, salt);

    try {
      await stylist.save();
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Email already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validatePassword(authCredentials: SignInCredentialsDto): Promise<string> {
    const { email, password } = authCredentials;
    const stylist = await this.findOne({ email });

    if (stylist && await bcrypt.compare(password, stylist.password)) {
      return stylist.email;
    } else {
      return null;
    }
  }
}
