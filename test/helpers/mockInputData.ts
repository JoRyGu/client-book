import { SignUpCredentialsDto } from '../../src/auth/dto/sign-up-credentials.dto';
import { SignInCredentialsDto } from '../../src/auth/dto/sign-in-credentials.dto';

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
