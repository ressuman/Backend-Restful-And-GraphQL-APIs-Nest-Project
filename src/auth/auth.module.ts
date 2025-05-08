import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { HashingModule } from './provider/hashing/hashing.module';
import { BcryptModule } from './provider/bcrypt/bcrypt.module';
import authConfig from './config/auth.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    //UsersModule,
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync(authConfig.asProvider()),
    HashingModule,
    BcryptModule,
  ], // Import UsersModule to use UsersService
  exports: [AuthService], // Export AuthService to be used in other modules if needed
})
export class AuthModule {}
