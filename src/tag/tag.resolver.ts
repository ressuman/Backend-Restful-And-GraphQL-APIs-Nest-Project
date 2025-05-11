import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';
import { CreateTagInputDto } from './dtos/create-tag.input.dto';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Mutation(() => Tag)
  async createTag(@Args('input') input: CreateTagInputDto): Promise<Tag> {
    const { tag } = await this.tagService.create(input);

    return tag;
  }
}
