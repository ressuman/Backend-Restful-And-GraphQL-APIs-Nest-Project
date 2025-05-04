import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import authConfig from './config/auth.config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [forwardRef(() => UsersModule), ConfigModule.forFeature(authConfig)], // Import UsersModule to use UsersService
  exports: [AuthService], // Export AuthService to be used in other modules if needed
})
export class AuthModule {}
