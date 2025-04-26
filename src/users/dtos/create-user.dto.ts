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

export class CreateUserDto {
  @IsInt({
    message: 'ID must be an integer number',
  })
  @Min(1, {
    message: 'ID must be at least 1',
  })
  id: number;

  @IsString({
    message: 'Name must be a string',
  })
  @IsNotEmpty({
    message: 'Name is required',
  })
  @MaxLength(50, {
    message: 'Name must not exceed 50 characters',
  })
  @MinLength(3, {
    message: 'Name must be at least 3 characters long',
  })
  name: string;

  @IsEmail(
    {},
    {
      message: 'Email must be a valid email address',
    },
  )
  @IsNotEmpty({
    message: 'Email is required',
  })
  email: string;

  @IsInt({
    message: 'Age must be an integer',
  })
  @Min(0, {
    message: 'Age must be at least 0',
  })
  @Max(120, {
    message: 'Age must not exceed 120',
  })
  age: number;

  @IsString({
    message: 'Gender must be a string',
  })
  @IsOptional()
  @IsIn(['male', 'female', 'other'], {
    message: 'Gender must be one of: male, female, or other',
  })
  gender: string;

  @IsBoolean({
    message: 'isMarried must be a boolean (true or false)',
  })
  isMarried: boolean;
}
