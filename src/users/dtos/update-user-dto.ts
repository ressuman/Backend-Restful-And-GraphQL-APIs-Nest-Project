import { PartialType } from '@nestjs/mapped-types';
import {
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsEmail,
  IsIn,
  IsInt,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // @IsOptional()
  // @IsString({
  //   message: 'Name must be a string',
  // })
  // @MaxLength(50, {
  //   message: 'Name must not exceed 50 characters',
  // })
  // @MinLength(3, {
  //   message: 'Name must be at least 3 characters long',
  // })
  // name?: string;
  // @IsOptional()
  // @IsEmail(
  //   {},
  //   {
  //     message: 'Email must be a valid email address',
  //   },
  // )
  // email?: string;
  // @IsOptional()
  // @IsInt({
  //   message: 'Age must be an integer',
  // })
  // @Min(0, {
  //   message: 'Age must be at least 0',
  // })
  // @Max(120, {
  //   message: 'Age must not exceed 120',
  // })
  // age?: number;
  // @IsOptional()
  // @IsBoolean({
  //   message: 'isMarried must be true or false',
  // })
  // isMarried?: boolean;
}
