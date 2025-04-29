import {
  MinLength,
  MaxLength,
  IsNotEmpty,
  //IsBoolean,
  IsEmail,
  //IsIn,
  //IsInt,
  IsString,
  IsOptional,
  //Max,
  //Min,
} from 'class-validator';
import { CreateProfileDto } from 'src/profile/dtos/create-profile.dto';

export class CreateUserDto {
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  @MaxLength(50, { message: 'Username must not exceed 50 characters' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  username: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(100, { message: 'Email must not exceed 100 characters' })
  @MinLength(5, { message: 'Email must be at least 5 characters long' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MaxLength(32, { message: 'Password must not exceed 32 characters' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsOptional()
  //profile: CreateProfileDto | null;
  profile?: CreateProfileDto;
}

// export class CreateUserDto {
//   @IsInt({
//     message: 'ID must be an integer number',
//   })
//   @Min(1, {
//     message: 'ID must be at least 1',
//   })
//   id: number;

//   @IsString({
//     message: 'Name must be a string',
//   })
//   @IsNotEmpty({
//     message: 'Name is required',
//   })
//   @MaxLength(50, {
//     message: 'Name must not exceed 50 characters',
//   })
//   @MinLength(3, {
//     message: 'Name must be at least 3 characters long',
//   })
//   name: string;

//   @IsEmail(
//     {},
//     {
//       message: 'Email must be a valid email address',
//     },
//   )
//   @IsNotEmpty({
//     message: 'Email is required',
//   })
//   email: string;

//   @IsInt({
//     message: 'Age must be an integer',
//   })
//   @Min(0, {
//     message: 'Age must be at least 0',
//   })
//   @Max(120, {
//     message: 'Age must not exceed 120',
//   })
//   age: number;

//   @IsString({
//     message: 'Gender must be a string',
//   })
//   @IsOptional()
//   @IsIn(['male', 'female', 'other'], {
//     message: 'Gender must be one of: male, female, or other',
//   })
//   gender: string;

//   @IsBoolean({
//     message: 'isMarried must be a boolean (true or false)',
//   })
//   isMarried: boolean;

//   @IsString({
//     message: 'Password must be a string',
//   })
//   @IsNotEmpty({
//     message: 'Password is required',
//   })
//   @MinLength(8, {
//     message: 'Password must be at least 8 characters long',
//   })
//   password: string;
// }
