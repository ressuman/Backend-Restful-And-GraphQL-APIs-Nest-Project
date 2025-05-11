import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../user.entity';

@ObjectType()
export class CreateUserResponseDto {
  @Field()
  message: string;

  @Field(() => User)
  user: User;
}
