import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
// import { GetUserByIdDto } from './dtos/get-user-by-id.dto';
// import { GetUserParamDto } from './dtos/get-user-param.dto';
// import { ParseParamDtoPipe } from './dtos/parse-param-dto-pipe';
// import { UpdateUserDto } from './dtos/update-user-dto';

// http://localhost:3000/users
@Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}
//   // http://localhost:3000/users
//   //  http://localhost:3000/users?gender=male

//   // // GET /users or /users/true or /users/false
//   // @Get(':isMarried')
//   // getUsers(
//   //   @Param('isMarried', new DefaultValuePipe(undefined), ParseBoolPipe)
//   //   isMarried: boolean,
//   //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
//   //   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
//   //   @Query('gender') gender?: string,
//   // ) {
//   //   const allUsers = this.usersService.getAllUsers();
//   //   console.log(
//   //     'Page:',
//   //     page,
//   //     'Limit:',
//   //     limit,
//   //     'Gender:',
//   //     gender,
//   //     'IsMarried:',
//   //     isMarried,
//   //   );

//   //   let filteredUsers = allUsers;

//   //   // Optional gender filter
//   //   if (gender) {
//   //     filteredUsers = filteredUsers.filter((user) => user.gender === gender);
//   //   }

//   //   // Optional isMarried filter (from param)
//   //   if (isMarried !== undefined) {
//   //     filteredUsers = filteredUsers.filter(
//   //       (user) => user.isMarried === isMarried,
//   //     );
//   //   }

//   //   // Pagination logic
//   //   const startIndex = (page - 1) * limit;
//   //   const endIndex = page * limit;

//   //   const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

//   //   return {
//   //     totalUsers: filteredUsers.length,
//   //     currentPage: page,
//   //     totalPages: Math.ceil(filteredUsers.length / limit),
//   //     users: paginatedUsers,
//   //   };
//   // }

//   // GET /users?gender=male&page=1&limit=10
//   @Get()
//   getAllUsers(
//     @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
//     @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
//     @Query('gender') gender?: string,
//   ): {
//     totalUsers: number;
//     currentPage: number;
//     totalPages: number;
//     users: User[];
//   } {
//     return this.getFilteredUsers(page, limit, gender);
//   }

//   // GET /users/married/:isMarried
//   // GET /users/married/true?page=1&limit=10
//   // @Get('married/:isMarried')
//   // getUsersByMarriedStatus(
//   //   @Param('isMarried', ParseBoolPipe) isMarried: boolean,
//   //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
//   //   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
//   //   @Query('gender') gender?: string,
//   // ) {
//   //   return this.getFilteredUsers(page, limit, gender, isMarried);
//   // }
//   @Get('married/:isMarried')
//   getUsersByMarriedStatus(
//     //@Param() params: GetUserParamDto,
//     //@Param(new ParseParamDtoPipe(GetUserParamDto)) params: GetUserParamDto,
//     @Param('isMarried', ParseBoolPipe) isMarried: boolean,
//     @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
//     @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
//     @Query('gender') gender?: string,
//   ) {
//     //console.log(params);
//     console.log(isMarried);
//     // return this.getFilteredUsers(page, limit, gender, params.isMarried);
//     return this.getFilteredUsers(page, limit, gender, isMarried);
//   }

//   // Utility function
//   private getFilteredUsers(
//     page: number,
//     limit: number,
//     gender?: string,
//     isMarried?: boolean,
//   ) {
//     const allUsers = this.usersService.getAllUsers();

//     let filteredUsers = allUsers;

//     if (gender) {
//       filteredUsers = filteredUsers.filter((user) => user.gender === gender);
//     }

//     if (isMarried !== undefined) {
//       filteredUsers = filteredUsers.filter(
//         (user) => user.isMarried === isMarried,
//       );
//     }

//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

//     return {
//       totalUsers: filteredUsers.length,
//       currentPage: page,
//       totalPages: Math.ceil(filteredUsers.length / limit),
//       users: paginatedUsers,
//     };
//   }

//   // GET /users/:id
//   @Get(':id')
//   @UsePipes(new ValidationPipe({ transform: true }))
//   getUserById(@Param() params: GetUserByIdDto) {
//     return this.usersService.getUserById(params.id);
//   }
//   // @Get(':id')
//   // getUserById(@Param('id', ParseIntPipe) id: number) {
//   //   console.log(typeof id, id);
//   //   return this.usersService.getUserById(id);
//   // }

//   // POST /users/create
//   @Post('create')
//   createUser(@Body() createUserDto: CreateUserDto) {
//     const user = this.usersService.createUser(createUserDto);
//     console.log(typeof user, user);
//     console.log(typeof createUserDto, createUserDto);
//     console.log(user instanceof CreateUserDto);
//     console.log(createUserDto instanceof CreateUserDto);
//     console.log(user instanceof Object);
//     console.log(createUserDto instanceof Object);
//     return {
//       message: 'User created successfully',
//       user,
//     };
//   }
//   // @Post('create')
//   // createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
//   //   const user = this.usersService.createUser(createUserDto);
//   //   return {
//   //     message: 'User created successfully',
//   //     user,
//   //   };
//   // }

//   // PATCH /users/:id
//   // @Patch(':id')
//   // @UsePipes(new ValidationPipe({ transform: true }))
//   // updateUser(
//   //   @Param() params: GetUserByIdDto,
//   //   @Body() updateUserDto: Partial<CreateUserDto>,
//   // ) {
//   //   const user = this.usersService.updateUser(params.id, updateUserDto);
//   //   return {
//   //     message: 'User updated successfully',
//   //     user,
//   //   };
//   // }
//   @Patch()
//   updateUser(
//     //@Param() params: GetUserByIdDto,
//     @Body() updateUserDto: UpdateUserDto,
//   ) {
//     console.log(updateUserDto);
//     //const user = this.usersService.updateUser(params.id, updateUserDto);
//     return {
//       message: 'User updated successfully',
//       // user,
//       updateUserDto,
//     };
//   }

//   // DELETE /users/:id
//   @Delete(':id')
//   @UsePipes(new ValidationPipe({ transform: true }))
//   deleteUser(@Param() params: GetUserByIdDto) {
//     const user = this.usersService.deleteUser(params.id);
//     return {
//       message: 'User deleted successfully',
//       user,
//     };
//   }
// }
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users?gender=male&page=1&limit=10
  @Get()
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return {
      message: 'All users fetched successfully',
      users,
    };
  }

  // GET /users/:id
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserById(id);
  }

  // POST /users/create
  @Post()
  async createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  //@Patch()
  // updateUser(
  //   //@Param() params: GetUserByIdDto,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   console.log(updateUserDto);
  //   //const user = this.usersService.updateUser(params.id, updateUserDto);
  //   return {
  //     message: 'User updated successfully',
  //     // user,
  //     updateUserDto,
  //   };
  // }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
