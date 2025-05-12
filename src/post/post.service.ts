import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from 'src/user/user.entity';
import { Tag } from 'src/tag/tag.entity';
import { CreatePostInputDto } from './dtos/create-post.input.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}
  async create(
    input: CreatePostInputDto,
  ): Promise<{ message: string; post: Post }> {
    const user = await this.userRepository.findOneOrFail({
      where: {
        id: input.userId,
      },
    });
    const tags = await this.tagRepository.findBy({
      id: In(input.tagIds || []),
    });
    const post = this.postRepository.create({
      ...input,
      user,
      tags,
    });
    await this.postRepository.save(post);
    return {
      message: 'Post created successfully',
      post,
    };
  }
}
