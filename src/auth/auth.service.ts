import {
  //BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
//import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { HashingService } from './provider/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/user.entity';
import { ActiveUserTypeInterface } from './interfaces/active-user-type.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    //@Inject(UsersService)
    private readonly usersService: UsersService,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,

    private readonly hashingService: HashingService,

    private readonly jwtService: JwtService,
  ) {}

  isAuthenticated: boolean = false;

  async signup(createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);

    return {
      message: 'User signed up successfully',
      user,
    };
  }

  async login(
    loginDto: LoginDto,
    // email: string,
    // password: string,
  ) {
    // const user = this.usersService
    //   .getAllUsers()
    //   .find(
    //     (u) => u.email === loginDto.email && u.password === loginDto.password,
    //   );
    // if (!user) {
    //   throw new BadRequestException('Invalid credentials.');
    // }
    //console.log(this.authConfiguration);
    //console.log(this.authConfiguration.sharedSecret);
    //this.isAuthenticated = true;

    // 1. Find the user in the database with the provided username
    const user = await this.usersService.findUserByUsername(loginDto.username);
    // 2. If the user is not found, throw an error

    // 3. If the user is found and available, compare the provided password with the hashed password in the database
    let isPasswordMatch: boolean = false;

    isPasswordMatch = await this.hashingService.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    // 4. If the passwords match, return a response indicating that the user has logged in successfully- return access token
    // Generate jwt token and send it to the user in the response
    // const accessToken = await this.jwtService.signAsync(
    //   {
    //     sub: user.id,
    //     //username: user.username,
    //     email: user.email,
    //   },
    //   {
    //     secret: this.authConfiguration.secret,
    //     expiresIn: this.authConfiguration.expiresIn,
    //     audience: this.authConfiguration.audience,
    //     issuer: this.authConfiguration.issuer,
    //   },
    // );

    // const refreshToken = await this.jwtService.signAsync(
    //   {
    //     sub: user.id,
    //     //username: user.username,
    //     //email: user.email,
    //   },
    //   {
    //     secret: this.authConfiguration.secret,
    //     expiresIn: this.authConfiguration.refreshTokenExpiresIn,
    //     audience: this.authConfiguration.audience,
    //     issuer: this.authConfiguration.issuer,
    //   },
    // );

    // return {
    //   success: true,
    //   message: 'User logged in successfully',
    //   user,
    //   token: {
    //     accessToken,
    //     refreshToken,
    //   },
    // };

    const token = await this.generateToken(user);

    return {
      success: true,
      message: 'User logged in successfully',
      user,
      token,
    };
  }

  private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload, // Spread the payload if provided
      },
      {
        secret: this.authConfiguration.secret,
        expiresIn,
        audience: this.authConfiguration.audience,
        issuer: this.authConfiguration.issuer,
      },
    );
  }

  private async generateToken(user: Users) {
    // Generate access token
    const accessToken = await this.signToken<Partial<ActiveUserTypeInterface>>(
      user.id,
      this.authConfiguration.expiresIn,
      {
        email: user.email,
      },
    );

    // Generate refresh token
    const refreshToken = await this.signToken(
      user.id,
      this.authConfiguration.refreshTokenExpiresIn,
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
