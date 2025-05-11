import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { TagModule } from 'src/tag/tag.module';
import { UserModule } from 'src/user/user.module';
import { Tag } from 'src/tag/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag]), TagModule, UserModule],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
