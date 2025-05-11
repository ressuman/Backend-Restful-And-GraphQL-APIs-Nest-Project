import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';
import { CreateProfileInputDto } from './dtos/create-profile.input.dto';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  async createProfile(
    @Args('input') input: CreateProfileInputDto,
  ): Promise<Profile> {
    const { profile } = await this.profileService.create(input);
    return profile;
  }
}
