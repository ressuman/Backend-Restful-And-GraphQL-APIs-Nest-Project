import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
//import { AuthModule } from 'src/auth/auth.module';
import { Users } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profile/profile.entity';
import { Tweet } from 'src/tweet/tweet.entity';
import { PaginationModule } from '../common/pagination/pagination.module';
import { AuthModule } from 'src/auth/auth.module';
import { HashingModule } from 'src/auth/provider/hashing/hashing.module';
//import { ConfigModule } from '@nestjs/config';
//import authConfig from 'src/auth/config/auth.config';
//import { JwtModule } from '@nestjs/jwt';
//import { APP_GUARD } from '@nestjs/core';
//import { AuthorizeGuard } from 'src/auth/guards/authorize.guard';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthorizeGuard,
    // },
    //forwardRef(() => AuthModule)
  ],
  exports: [UsersService], // Export UsersService to be used in other modules
  //imports: [forwardRef(() => AuthModule)], // Use forwardRef to avoid circular dependency
  // This is necessary if AuthService needs to use UsersService
  // and UsersService needs to use AuthService.
  imports: [
    PaginationModule,
    TypeOrmModule.forFeature([Users, Profile, Tweet]),
    forwardRef(() => AuthModule),
    HashingModule,
    // ConfigModule.forFeature(authConfig),
    // JwtModule.registerAsync(authConfig.asProvider()),
  ], // Add your entities here
})
export class UsersModule {}
