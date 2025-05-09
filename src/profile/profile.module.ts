import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { Profile } from './profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ProfileService, ProfileResolver],
  imports: [TypeOrmModule.forFeature([Profile])],
  exports: [ProfileService],
})
export class ProfileModule {}
