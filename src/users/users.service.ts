import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  //forwardRef,
  // Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
//import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { Users } from './user.entity';
import { Profile } from 'src/profile/profile.entity';
import { ConfigService } from '@nestjs/config';
import { UserAlreadyExistsException } from 'src/customExceptions/user-already-exists.exception';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import { PaginationInterface } from 'src/common/pagination/pagination.interface';
import { HashingService } from '../auth/provider/hashing/hashing.service';

// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   age: number;
//   gender: string;
//   isMarried: boolean;
//   password: string;
// }

// @Injectable()
// export class UsersService {
//   constructor(
//     @Inject(forwardRef(() => AuthService))
//     private readonly authService: AuthService,
//   ) {}

//   private readonly users: User[] = [
//     {
//       id: 1,
//       name: 'John',
//       email: '6tGt4@example.com',
//       age: 30,
//       gender: 'male',
//       isMarried: false,
//       password: 'password123',
//     },
//     {
//       id: 2,
//       name: 'Jane',
//       email: 'kMgBt@example.com',
//       age: 25,
//       gender: 'female',
//       isMarried: true,
//       password: 'password123',
//     },
//     {
//       id: 3,
//       name: 'Bob',
//       email: 'B4L4M@example.com',
//       age: 40,
//       gender: 'male',
//       isMarried: false,
//       password: 'password123',
//     },
//     {
//       id: 4,
//       name: 'Alice',
//       email: 'm6t4o@example.com',
//       age: 35,
//       gender: 'female',
//       isMarried: true,
//       password: 'password123',
//     },
//   ];

//   getAllUsers(): User[] {
//     if (this.authService.isAuthenticated) {
//       return this.users;
//     }

//     throw new Error('You are not authorized to view this information.');
//   }

//   getUserById(id: number): User {
//     const user = this.users.find((u) => u.id === id);
//     if (!user) {
//       throw new NotFoundException(`User with id ${id} not found`);
//     }
//     return user;
//   }

//   createUser(userData: Omit<User, 'id'>): User {
//     const newUser: User = {
//       id: this.users.length + 1,
//       ...userData,
//     };
//     this.users.push(newUser);
//     return newUser;
//   }

//   updateUser(id: number, updateData: Partial<Omit<User, 'id'>>): User {
//     const user = this.getUserById(id);
//     const updatedUser = { ...user, ...updateData };
//     const index = this.users.findIndex((u) => u.id === id);
//     this.users[index] = updatedUser;
//     return updatedUser;
//   }

//   deleteUser(id: number): User {
//     const index = this.users.findIndex((u) => u.id === id);
//     if (index === -1) {
//       throw new NotFoundException(`User with id ${id} not found`);
//     }
//     const [deletedUser] = this.users.splice(index, 1);
//     return deletedUser;
//   }
// }

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,

    private readonly configService: ConfigService,

    private readonly paginationService: PaginationService,

    @Inject(forwardRef(() => HashingService))
    private readonly hashingService: HashingService,
  ) {}

  public async getAllUsers() {
    try {
      //const environment = this.configService.get<string>('ENV_MODE');
      const environment: string | undefined =
        this.configService.get<string>('ENV_MODE');
      console.log(environment);
      const env = process.env.ENV_MODE;
      console.log(env);
      const envI = process.env.NODE_ENV;
      console.log(envI);

      return await this.userRepository.find({
        relations: {
          profile: true,
          //tweet: true,
          // Add other relations if needed
        },
      });
    } catch (error) {
      if ((error as any).code === 'ECONNREFUSED') {
        throw new RequestTimeoutException('Failed to fetch users', {
          description: 'Could not connect to database',
        });
      }

      console.log(error);
    }
  }

  public async getUsers(
    paginationQueryDto: PaginationQueryDto,
  ): Promise<PaginationInterface<Users>> {
    try {
      return await this.paginationService.paginatedQuery(
        paginationQueryDto,
        this.userRepository,
        undefined,
        ['profile'],
      );

      // return await this.userRepository.find({
      //   relations: {
      //     profile: true,
      //   },
      // });
    } catch (error) {
      if ((error as any).code === 'ECONNREFUSED') {
        throw new RequestTimeoutException('Failed to fetch users', {
          description: 'Could not connect to database',
        });
      }

      console.log(error);
      throw error; // Ensure the error is re-thrown to maintain proper error handling
    }
  }

  // public async getUsers(
  //   paginationQueryDto: PaginationQueryDto,
  // ): Promise<PaginationInterface<Users>> {
  //   try {
  //     const users = await this.paginationService.paginatedQuery(
  //       paginationQueryDto,
  //       this.userRepository,
  //       undefined,
  //       ['profile'],
  //     );

  //     // return await this.userRepository.find({
  //     //   relations: {
  //     //     profile: true,
  //     //   },
  //     // });

  //     return users;
  //   } catch (error) {
  //     if ((error as any).code === 'ECONNREFUSED') {
  //       throw new RequestTimeoutException('Failed to fetch users', {
  //         description: 'Could not connect to database',
  //       });
  //     }

  //     console.log(error);
  //   }
  // }

  public async createUser(userDto: CreateUserDto) {
    try {
      /* The commented code block you provided is a part of the `createUser` method in the `UsersService`
 class. Here's a breakdown of what each step is doing: */
      // // 1. Validate if the user already exists with the given email in the database
      // const user = await this.userRepository.findOne({
      //   where: {
      //     email: userDto.email,
      //   },
      // });
      // // 2. If the user already exists, throw an error - exception
      // if (user) {
      //   throw new NotFoundException(
      //     `User with email ${userDto.email} already exists`,
      //   );
      // }
      // // 3. If the user doesn't exist, create a new user in the database
      // const newUser = this.userRepository.create(userDto);
      // await this.userRepository.save(newUser);
      // // 4. Return the newly created user
      // return {
      //   message: 'User created successfully',
      //   user: newUser,
      // };
      // Create a Profile & save it to the database
      userDto.profile = userDto.profile ?? {};
      // const profile = this.profileRepository.create(userDto.profile);
      // await this.profileRepository.save(profile);

      // Check if the user already exists
      //Using predefined exceptions
      // const existingUser = await this.userRepository.findOne({
      //   where: [
      //     {
      //       email: userDto.email,
      //     },
      //     {
      //       username: userDto.username,
      //     },
      //   ],
      // });
      // if (existingUser) {
      //   throw new BadRequestException(
      //     'User with email or username already exists',
      //   );
      // }

      //Using custom exceptions
      const existingUserWithUsername = await this.userRepository.findOne({
        where: {
          username: userDto.username,
        },
      });
      if (existingUserWithUsername) {
        throw new UserAlreadyExistsException('username', userDto.username);
      }
      const existingUserWithEmail = await this.userRepository.findOne({
        where: {
          email: userDto.email,
        },
      });
      if (existingUserWithEmail) {
        throw new UserAlreadyExistsException('email', userDto.email);
      }

      // Create a new user
      const user = this.userRepository.create({
        ...userDto,
        password: await this.hashingService.hashPassword(userDto.password),
      });

      // // Set the profile to the user
      // user.profile = profile;

      // // Explicitly set the reverse relationship
      // if (user.profile) {
      //   user.profile.user = user;
      // }

      // Save the user to the database
      //user = await this.userRepository.save({ ...user });
      await this.userRepository.save(user);

      // Return the user
      return {
        message: 'User created successfully',
        user,
      };
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException('Failed to fetch users', {
          description: 'Could not connect to database',
        });
      }

      // if (error.code === '23505') {
      //   throw new BadRequestException('Duplicate email and username found', {
      //     description: 'User with email and username already exists',
      //   });
      // }
      throw error;
      // console.error('Bad Request', error);
    }
  }

  updateUser() {}

  // public async deleteUser(id: number) {
  //   //
  //   const user = await this.userRepository.findOne({
  //     where: {
  //       id,
  //     },
  //   });

  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }

  //   // Delete the user
  //   await this.userRepository.delete(id);

  //   // Send a response indicating successful deletion
  //   return {
  //     message: `User with ID ${id} deleted successfully`,
  //   };
  // }
  public async deleteUser(id: number) {
    try {
      // Delete the user
      await this.userRepository.delete(id);

      // Send a response indicating successful deletion
      return {
        message: `User with ID ${id} deleted successfully`,
      };
    } catch (error) {
      console.error('Error occurred while fetching users:', error);
      throw new RequestTimeoutException('Failed to fetch users', {
        description: 'Could not connect to database',
      });
    }
  }

  public async findUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      // throw new NotFoundException(`User with ID ${id} not found`);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User with ID ${id} not found`,
          table: 'users',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: new Error(`User with ID ${id} not found`),
          description: `The exception message is because - User with ID ${id} not found in the users table`,
        },
      );
    }

    return user;
    // try {
    //   const user = await this.userRepository.findOneBy({ id });

    //   if (!user) {
    //     // throw new NotFoundException(`User with ID ${id} not found`);
    //     throw new HttpException(
    //       {
    //         status: HttpStatus.NOT_FOUND,
    //         error: `User with ID ${id} not found`,
    //         table: 'users',
    //       },
    //       HttpStatus.NOT_FOUND,
    //       {
    //         cause: new Error(`User with ID ${id} not found`),
    //         description: `The exception message is because - User with ID ${id} not found in the users table`,
    //       },
    //     );
    //   }

    //   return user;
    // } catch (error) {
    //   console.error('Error occurred while fetching users:', error);
    //   throw new RequestTimeoutException('Failed to fetch users', {
    //     description: 'Could not connect to database',
    //   });
    // }
  }

  async findUserByUsername(username: string): Promise<Users> {
    let user: Users | null = null;

    try {
      user = await this.userRepository.findOneBy({ username });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'User with given username not found',
      });
    }

    if (!user) {
      throw new UnauthorizedException(
        `User with username ${username} not found`,
      );
    }

    return user;
  }
}
