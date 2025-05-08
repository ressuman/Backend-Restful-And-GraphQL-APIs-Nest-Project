import { Module } from '@nestjs/common';
import { HashingController } from './hashing.controller';
import { HashingService } from './hashing.service';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Module({
  controllers: [HashingController],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
  exports: [HashingService],
})
export class HashingModule {}
