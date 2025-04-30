import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dtos/create-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async createProfile(@Body() createProfileDto: CreateProfileDto) {
    const profile = await this.profileService.createProfile(createProfileDto);
    return {
      message: 'Profile created successfully',
      profile,
    };
  }

  @Get()
  async getAllProfiles() {
    const profiles = await this.profileService.getAllProfiles();
    return {
      message: 'All profiles fetched successfully',
      profiles,
    };
  }

  @Get(':id')
  async getProfileById(@Param('id', ParseIntPipe) id: number) {
    const profile = await this.profileService.getProfileById(id);
    return {
      message: `Profile with ID ${id} fetched successfully`,
      profile,
    };
  }

  @Put(':id')
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: Partial<CreateProfileDto>,
  ) {
    const profile = await this.profileService.updateProfile(id, updateDto);
    return {
      message: `Profile with ID ${id} updated successfully`,
      profile,
    };
  }

  @Delete(':id')
  async deleteProfile(@Param('id', ParseIntPipe) id: number) {
    return await this.profileService.deleteProfile(id);
  }
}
