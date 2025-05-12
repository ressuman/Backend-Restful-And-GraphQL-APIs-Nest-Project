import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { CreateProfileInputDto } from './dtos/create-profile.input.dto';
import { UpdateProfileInputDto } from './dtos/update-profile.input.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  // async create(
  //   input: CreateProfileInputDto,
  // ): Promise<{ message: string; profile: Profile }> {
  //   // const user = await this.userRepository.findOneBy({ id: input.userId });
  //   const user = await this.userRepository.findOneOrFail({
  //     where: {
  //       id: input.userId,
  //     },
  //   });

  //   if (!user) {
  //     throw new Error(`User with ID ${input.userId} not found`);
  //   }

  //   const existingProfile = await this.profileRepository.findOne({
  //     where: { user: { id: input.userId } },
  //   });

  //   if (existingProfile) {
  //     throw new BadRequestException('User already has a profile');
  //   }
  //   const profile = this.profileRepository.create({
  //     ...input,
  //     user,
  //   });

  //   await this.profileRepository.save(profile);
  //   return {
  //     message: 'Profile created successfully',
  //     profile,
  //   };
  // }

  // async findByUserId(userId: number): Promise<Profile | null> {
  //   return this.profileRepository.findOne({
  //     where: { user: { id: userId } },
  //   });
  // }

  async create(createProfileDto: CreateProfileInputDto): Promise<Profile> {
    // If userId is provided, validate it exists
    if (createProfileDto.userId) {
      const userExists = await this.userRepository.findOne({
        where: { id: createProfileDto.userId },
      });

      if (!userExists) {
        throw new BadRequestException(
          `User with ID ${createProfileDto.userId} not found`,
        );
      }
    }

    const profile = this.profileRepository.create({
      bio: createProfileDto.bio,
      avatar: createProfileDto.avatar,
      userId: createProfileDto.userId,
    });

    return await this.profileRepository.save(profile);
  }

  async findByUserId(userId: number): Promise<Profile | null> {
    return await this.profileRepository.findOne({
      where: { userId },
    });
  }

  async createProfileForUser(
    userId: number,
    profileData: Partial<CreateProfileInputDto>,
  ): Promise<Profile> {
    // Validate user exists
    const userExists = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!userExists) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }

    const profile = this.profileRepository.create({
      bio: profileData.bio,
      avatar: profileData.avatar,
      userId: userId,
    });

    return await this.profileRepository.save(profile);
  }

  async update(userId: number, input: UpdateProfileInputDto): Promise<Profile> {
    // Find the existing profile
    const existingProfile = await this.profileRepository.findOne({
      where: { userId },
    });

    if (!existingProfile) {
      // If no profile exists, create a new one
      const userExists = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!userExists) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      const newProfile = this.profileRepository.create({
        bio: input.bio,
        avatar: input.avatar,
        userId: userId,
      });

      return await this.profileRepository.save(newProfile);
    }

    // Update profile fields
    if (input.bio !== undefined) {
      existingProfile.bio = input.bio;
    }
    if (input.avatar !== undefined) {
      existingProfile.avatar = input.avatar;
    }

    // Save and return updated profile
    return await this.profileRepository.save(existingProfile);
  }

  async delete(userId: number): Promise<Profile> {
    // Find the profile to be deleted
    const profile = await this.profileRepository.findOne({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException(`Profile for user ID ${userId} not found`);
    }

    // Soft delete the profile
    return await this.profileRepository.softRemove(profile);
  }
}
