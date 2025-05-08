import { Injectable } from '@nestjs/common';
import { HashingService } from '../hashing/hashing.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements HashingService {
  async hashPassword(password: string | Buffer): Promise<string> {
    // Generate salt
    const salt = await bcrypt.genSalt();

    // Hash password
    return await bcrypt.hash(password, salt);
  }
  async comparePassword(
    plainPassword: string | Buffer,
    hashedPassword: string | Buffer,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
