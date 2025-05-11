import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { CreatePostInputDto } from './dtos/create-post.input.dto';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  async createPost(@Args('input') input: CreatePostInputDto): Promise<Post> {
    const { post } = await this.postService.create(input);
    return post;
  }
}
