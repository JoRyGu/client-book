import { SignUpCredentialsDto } from '../../src/auth/dto/sign-up-credentials.dto';
import { SignInCredentialsDto } from '../../src/auth/dto/sign-in-credentials.dto';
import { CreateClientDto } from '../../src/client/dto/createClient.dto';

export const createJohnDoe: SignUpCredentialsDto = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'testing@test.net',
  password: 'feelG00d1nc.',
};

export const signInJohnDoe: SignInCredentialsDto = {
  email: 'testing@test.net',
  password: 'feelG00d1nc.',
};

export const createClient: CreateClientDto = {
  name: 'Keanu Reaves',
  phoneNumber: '9048675309',
  email: 'k.reaves@gmail.com',
  birthday: {
    day: '02',
    month: '09',
    year: '1964',
  },
};
