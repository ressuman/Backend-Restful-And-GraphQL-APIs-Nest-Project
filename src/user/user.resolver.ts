import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserInputDto } from './dtos/create-user.input.dto';
import { CreateUserResponseDto } from './dtos/create-user-response.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => CreateUserResponseDto)
  async createUser(
    @Args('input') input: CreateUserInputDto,
  ): Promise<CreateUserResponseDto> {
    return await this.userService.create(input);
  }

  @Query(() => [User])
  async users() {
    return await this.userService.findAll();
  }
}
