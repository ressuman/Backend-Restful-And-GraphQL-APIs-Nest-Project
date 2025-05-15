import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { HashingModule } from './provider/hashing/hashing.module';
import { BcryptModule } from './provider/bcrypt/bcrypt.module';
import authConfig from './config/auth.config';
import { JwtModule } from '@nestjs/jwt';
//import { APP_GUARD } from '@nestjs/core';
//import { AuthorizeGuard } from './guards/authorize.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthorizeGuard,
    // },
  ],
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
