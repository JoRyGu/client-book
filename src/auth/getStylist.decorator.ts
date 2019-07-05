import { createParamDecorator } from '@nestjs/common';
import { Stylist } from './stylist.entity';

export const GetStylist = createParamDecorator((data, req): Stylist => {
  return req.user;
});
