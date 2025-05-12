import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Logger } from '@nestjs/common';
import { Profile } from 'src/profile/profile.entity';
import { ProfileService } from 'src/profile/profile.service';
import { Post } from 'src/post/post.entity';
import { CreateUserInputDto } from './dtos/create-user.input.dto';
import { CreateUserResponseDto } from './dtos/create-user-response.dto';
import { UpdateUserInputDto } from './dtos/update-user.input.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,

    private readonly profileService: ProfileService,
  ) {}

  private readonly logger = new Logger(UserResolver.name);

  @Mutation(() => CreateUserResponseDto)
  // async createUser(
  //   @Args('input') input: CreateUserInputDto,
  // ): Promise<CreateUserResponseDto> {
  //   return await this.userService.create(input);
  // }
  async createUser(
    @Args('input') input: CreateUserInputDto,
  ): Promise<CreateUserResponseDto> {
    // Add some logging for debugging
    this.logger.debug('Creating user with input:', input);

    const result = await this.userService.create(input);

    // Modify the mutation to select specific fields
    return {
      message: result.message,
      user: result.user,
    };
  }
  // @Query(() => [User])
  // async users() {
  //   return await this.userService.findAll();
  // }
  // @Query(() => [User], { name: 'users' })
  // async findAll() {
  //   return await this.userService.findAll();
  // }
  // @Query(() => [User], { name: 'users', nullable: false })
  // async findAll(): Promise<User[]> {
  //   const users = await this.userService.findAll();
  //   return users ?? []; // avoid returning null
  // }

  // @ResolveField('profile', () => Profile, { nullable: true })
  // async getProfile(@Parent() user: User): Promise<Profile | null> {
  //   // If using Promise-based lazy loading
  //   //return user.profile ?? null;

  //   // OR if you need to manually fetch:
  //   return await this.profileService.findByUserId(user.id);
  // }

  // @ResolveField('profile')
  // async profile(@Parent() user: User) {
  //   this.logger.debug('Fetching profile for user:', user.id);

  //   return await user.profile;
  // }

  @Query(() => [User], { name: 'users', nullable: false })
  async findAll(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users ?? []; // avoid returning null
  }

  @Query(() => User)
  async getUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  // Remove @ResolveField('profile') method - we don't need it as we're loading
  // relations directly in the service

  // Keep only one resolver for profile
  @ResolveField(() => Profile, { name: 'profile', nullable: true })
  getProfile(@Parent() user: User): Profile | null {
    this.logger.debug(`Resolving profile for user: ${user.id}`);
    return user.profile || null;
  }

  @ResolveField(() => [Post], { name: 'posts', nullable: 'items' })
  getPosts(@Parent() user: User): Post[] {
    return user.posts || [];
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  async user(@Args('id', { type: () => Number }) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateUserInputDto,
  ): Promise<User> {
    return this.userService.update(id, input);
  }

  // Hard delete
  @Mutation(() => Boolean)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.remove(id);
  }

  // Soft delete
  @Mutation(() => User)
  async deleteUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.delete(id);
  }
}
