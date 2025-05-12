import { forwardRef, Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { Profile } from './profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), forwardRef(() => UserModule)],
  providers: [ProfileService, ProfileResolver],
  exports: [ProfileService, TypeOrmModule.forFeature([Profile])],
})
export class ProfileModule {}
