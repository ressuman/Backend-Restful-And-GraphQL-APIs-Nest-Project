import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
//import { CreateUserInputDto } from './dtos/create-user.input.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  // async findAll(): Promise<{ message: string; users: User[] }> {
  //   const users = await this.userRepository.find();

  //   return {
  //     message: 'Users found successfully',
  //     users,
  //   };
  // }
  async findAll(): Promise<User[]> {
    return await this.userRepository
      .find
      //{
      //relations: ['profile', 'posts'],
      //}
      ();
  }
}
