import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

// http://localhost:3000/users
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // http://localhost:3000/users
  //  http://localhost:3000/users?gender=male

  // GET /users or /users?gender=male
  @Get()
  getUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('gender') gender?: string,
  ) {
    const allUsers = this.usersService.getAllUsers();
    console.log(limit, page);
    // Optional gender filter
    const filteredUsers = gender
      ? allUsers.filter((user) => user.gender === gender)
      : allUsers;

    // Pagination logic
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      totalUsers: filteredUsers.length,
      currentPage: page,
      totalPages: Math.ceil(filteredUsers.length / limit),
      users: paginatedUsers,
    };
  }

  // GET /users/:id
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id, id);
    return this.usersService.getUserById(id);
  }

  // POST /users/create
  @Post('create')
  createUser(
    @Body()
    user: {
      name: string;
      age: number;
      gender: string;
      isMarried: boolean;
    },
  ) {
    const newUser = this.usersService.createUser(user);
    return {
      message: 'User created successfully',
      user: newUser,
    };
  }
}
