import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => ProfileModule)],
  providers: [UserService, UserResolver],
  exports: [UserService, TypeOrmModule.forFeature([User])],
})
export class UserModule {}
