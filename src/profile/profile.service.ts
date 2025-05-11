import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { CreateProfileInputDto } from './dtos/create-profile.input.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    input: CreateProfileInputDto,
  ): Promise<{ message: string; profile: Profile }> {
    // const user = await this.userRepository.findOneBy({ id: input.userId });
    const user = await this.userRepository.findOneOrFail({
      where: {
        id: input.userId,
      },
    });

    if (!user) {
      throw new Error(`User with ID ${input.userId} not found`);
    }

    const profile = this.profileRepository.create({
      ...input,
      user,
    });

    await this.profileRepository.save(profile);

    return {
      message: 'Profile created successfully',
      profile,
    };
  }
}
