import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { CreateProfileDto } from './dtos/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = this.profileRepository.create(createProfileDto);
    return await this.profileRepository.save(profile);
  }

  async getAllProfiles(): Promise<Profile[]> {
    return await this.profileRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async getProfileById(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    return profile;
  }

  async updateProfile(
    id: number,
    updateDto: Partial<CreateProfileDto>,
  ): Promise<Profile> {
    const profile = await this.getProfileById(id);

    const updated = Object.assign(profile, updateDto);
    return await this.profileRepository.save(updated);
  }

  async deleteProfile(id: number): Promise<{ message: string }> {
    const result = await this.profileRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    return {
      message: `Profile with ID ${id} deleted successfully`,
    };
  }
}
