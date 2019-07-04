import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { StylistRepository } from './stylist.repository';
import { JwtPayload } from './jwt-payload.interface';
import { Stylist } from './stylist.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(StylistRepository)
    private stylistRepo: StylistRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret',
    });
  }

  async validate(payload: JwtPayload): Promise<Stylist> {
    const { email } = payload;
    const stylist = await this.stylistRepo.findOne({ email });

    if (!stylist) {
      throw new UnauthorizedException();
    }

    return stylist;
  }
}
