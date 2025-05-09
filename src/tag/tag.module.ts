import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagResolver } from './tag.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';

@Module({
  providers: [TagService, TagResolver],
  imports: [TypeOrmModule.forFeature([Tag])],
  exports: [TagService],
})
export class TagModule {}
