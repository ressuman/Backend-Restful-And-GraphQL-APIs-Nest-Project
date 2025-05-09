import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { TagModule } from 'src/tag/tag.module';

@Module({
  providers: [PostService, PostResolver],
  imports: [TypeOrmModule.forFeature([Post]), TagModule],
  exports: [PostService],
})
export class PostModule {}
