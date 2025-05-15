import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import authConfig from '../config/auth.config';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // throw new Error('Method not implemented.');
    //return false;

    // 1. Extract request from execution context
    const request: Request = context.switchToHttp().getRequest();

    // 2. Extract token from the request header
    const token = request.headers.authorization?.split(' ')[1];
    // const authHeader = request.headers['authorization'];
    // const token = authHeader?.split(' ')[1];

    console.log('Token:', token);

    // 3. Validate token and provide/deny access
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.authConfiguration,
        // {
        //   secret: this.authConfiguration.secret,
        //   expiresIn: this.authConfiguration.expiresIn,
        //   audience: this.authConfiguration.audience,
        //   issuer: this.authConfiguration.issuer,
        // }
      );

      request['user'] = payload;
      console.log('Payload:', payload);
    } catch (error) {
      console.error('Token validation failed');
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
// const request = context.switchToHttp().getRequest();
// const user = request.user;

// // Check if the user exists and has the required role or permission
// if (user && user.roles && user.roles.includes('admin')) {
//   return true;
// }

// // Deny access if the user is not authorized
// return false;
