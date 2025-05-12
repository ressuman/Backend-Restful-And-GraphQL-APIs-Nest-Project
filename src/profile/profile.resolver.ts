import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';
import { CreateProfileInputDto } from './dtos/create-profile.input.dto';
import { UpdateProfileInputDto } from './dtos/update-profile.input.dto';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}
  @Mutation(() => Profile)
  async createProfile(
    @Args('input') input: CreateProfileInputDto,
  ): Promise<Profile> {
    return await this.profileService.create(input);
  }

  @Mutation(() => Profile)
  async createProfileForUser(
    @Args('userId', { type: () => Number }) userId: number,
    @Args('input', { nullable: true }) input?: CreateProfileInputDto,
  ): Promise<Profile> {
    // If no input is provided, create an empty profile
    const profileData = input || {};
    return await this.profileService.createProfileForUser(userId, profileData);
  }

  @Query(() => Profile, { nullable: true })
  async profileByUserId(
    @Args('userId', { type: () => Number }) userId: number,
  ): Promise<Profile | null> {
    return this.profileService.findByUserId(userId);
  }

  @Mutation(() => Profile)
  async updateProfile(
    @Args('userId', { type: () => Number }) userId: number,
    @Args('input') input: UpdateProfileInputDto,
  ): Promise<Profile> {
    return this.profileService.update(userId, input);
  }

  @Mutation(() => Profile)
  async deleteProfile(
    @Args('userId', { type: () => Number }) userId: number,
  ): Promise<Profile> {
    return this.profileService.delete(userId);
  }
}
