import { registerAs } from '@nestjs/config';

export default registerAs('authConfig', () => ({
  //secret: process.env.JWT_SECRET,
  sharedSecret: process.env.SECRET_KEY,
  //expiresIn: process.env.JWT_EXPIRES_IN,
}));
