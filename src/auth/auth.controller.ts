// import { Body, Controller, Post } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LoginDto } from './dtos/login.dto';
// import { SignupDto } from './dtos/signup.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}
//   // Add your authentication methods here
//   // http://localhost:3000/auth/signup
//   @Post('signup')
//   signup(@Body() signupDto: SignupDto) {
//     return this.authService.signup(signupDto);
//   }

//   // http://localhost:3000/auth/login
//   @Post('login')
//   login(@Body() loginDto: LoginDto) {
//     return this.authService.login(loginDto);
//   }
// }
