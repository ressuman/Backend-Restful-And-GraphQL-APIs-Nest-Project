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

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
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
  ], // Add your entities here
})
export class UsersModule {}
