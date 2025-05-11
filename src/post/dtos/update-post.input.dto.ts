import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreatePostInputDto } from './create-post.input.dto';

@InputType()
export class UpdatePostInputDto extends PartialType(CreatePostInputDto) {
  @Field(() => [Int], { nullable: true })
  tagIds?: number[];
}
