import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './user.entity';
import { Profile } from 'src/profile/profile.entity';
import { CreateUserInputDto } from './dtos/create-user.input.dto';
import { UpdateUserInputDto } from './dtos/update-user.input.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  // async create(
  //   input: CreateUserInputDto,
  // ): Promise<{ message: string; user: User }> {
  //   const user = this.userRepository.create(input);
  //   await this.userRepository.save(user);

  //   return {
  //     message: 'User created successfully',
  //     user,
  //   };
  // }

  async create(
    input: CreateUserInputDto,
  ): Promise<{ message: string; user: User }> {
    // Create user first
    const user = this.userRepository.create({
      username: input.username,
      email: input.email,
      password: input.password,
      role: input.role,
    });

    // Save user to get the ID
    const savedUser = await this.userRepository.save(user);

    // Create profile if provided
    if (input.profile) {
      const profile = this.profileRepository.create({
        bio: input.profile.bio,
        avatar: input.profile.avatar,
        userId: savedUser.id,
      });

      savedUser.profile = await this.profileRepository.save(profile);
    }

    return {
      message: 'User created successfully',
      user: savedUser,
    };
  }

  // async findAll(): Promise<{ message: string; users: User[] }> {
  //   const users = await this.userRepository.find();

  //   return {
  //     message: 'Users found successfully',
  //     users,
  //   };
  // }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['profile', 'posts'],
    });
  }

  // async getProfileByUserId(userId: number) {
  //   return this.profileRepository.findOne({
  //     where: { user: { id: userId } },
  //   });
  // }
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: { id },
      relations: ['profile', 'posts'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  // async update(id: number, input: UpdateUserInputDto): Promise<User> {
  //   // Find the existing user
  //   const existingUser = await this.userRepository.findOne({
  //     where: { id },
  //     relations: ['profile'],
  //   });

  //   if (!existingUser) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }

  //   // Check if email or username already exist (if being updated)
  //   if (input.email) {
  //     const emailExists = await this.userRepository.findOne({
  //       where: { email: input.email, id: Not(id) },
  //     });
  //     if (emailExists) {
  //       throw new BadRequestException('Email is already in use');
  //     }
  //   }

  //   if (input.username) {
  //     const usernameExists = await this.userRepository.findOne({
  //       where: { username: input.username, id: Not(id) },
  //     });
  //     if (usernameExists) {
  //       throw new BadRequestException('Username is already in use');
  //     }
  //   }

  //   // Update user fields
  //   if (input.username) existingUser.username = input.username;
  //   if (input.email) existingUser.email = input.email;
  //   if (input.role) existingUser.role = input.role;
  //   if (input.password) existingUser.password = input.password;

  //   // Save the updated user first
  //   const updatedUser = await this.userRepository.save(existingUser);

  //   // Handle profile update separately
  //   if (input.profile) {
  //     if (!existingUser.profile) {
  //       // Create new profile if it doesn't exist
  //       const newProfile = this.profileRepository.create({
  //         bio: input.profile.bio,
  //         avatar: input.profile.avatar,
  //         userId: existingUser.id,
  //       });
  //       updatedUser.profile = await this.profileRepository.save(newProfile);
  //     } else {
  //       // Update existing profile
  //       if (input.profile.bio !== undefined) {
  //         existingUser.profile.bio = input.profile.bio;
  //       }
  //       if (input.profile.avatar !== undefined) {
  //         existingUser.profile.avatar = input.profile.avatar;
  //       }
  //       await this.profileRepository.save(existingUser.profile);
  //       updatedUser.profile = existingUser.profile;
  //     }
  //   }

  //   return updatedUser;
  // }
  async update(id: number, input: UpdateUserInputDto): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: { id },
    });

    return await this.userRepository.save(new User(Object.assign(user, input)));
  }

  // Soft delete
  async delete(id: number): Promise<User> {
    // Find the user to be deleted
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile', 'posts'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Soft delete the user
    return await this.userRepository.softRemove(user);
  }

  // Hard delete
  async remove(id: number) {
    // Find the user to be deleted
    const result = await this.userRepository.delete(id);

    return result.affected === 1;
  }
}
