// import {
//   BadRequestException,
//   forwardRef,
//   Inject,
//   Injectable,
// } from '@nestjs/common';
// import { SignupDto } from './dtos/signup.dto';
// import { LoginDto } from './dtos/login.dto';
// import { UsersService } from 'src/users/users.service';

// @Injectable()
// export class AuthService {
//   constructor(
//     @Inject(forwardRef(() => UsersService))
//     private readonly usersService: UsersService,
//   ) {}

//   isAuthenticated: boolean = false;

//   signup(signupDto: SignupDto) {
//     const existingUser = this.usersService
//       .getAllUsers()
//       .find((user) => user.email === signupDto.email);

//     if (existingUser) {
//       throw new BadRequestException('Email already in use.');
//     }

//     const newUser = this.usersService.createUser({
//       name: signupDto.username, // using username as the name
//       email: signupDto.email,
//       age: 18, // or default age if you want
//       gender: 'male', // or default gender
//       isMarried: false,
//       password: signupDto.password,
//     });

//     this.isAuthenticated = true;

//     return { message: 'User signed up successfully', user: newUser };
//   }

//   login(loginDto: LoginDto) {
//     const user = this.usersService
//       .getAllUsers()
//       .find(
//         (u) => u.email === loginDto.email && u.password === loginDto.password,
//       );

//     if (!user) {
//       throw new BadRequestException('Invalid credentials.');
//     }

//     this.isAuthenticated = true;

//     return { message: 'User logged in successfully', user };
//   }
// }
