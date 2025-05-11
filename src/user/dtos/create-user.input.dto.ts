import { Field, InputType } from '@nestjs/graphql';
import { Role } from 'src/enums/role.enum';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { CreateProfileInputDto } from 'src/profile/dtos/create-profile.input.dto';

@InputType()
export class CreateUserInputDto {
  @Field()
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(50, { message: 'Username must not exceed 50 characters' })
  @Transform(({ value }) => value.trim())
  username: string;

  @Field()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @MinLength(5, { message: 'Email must be at least 5 characters long' })
  @MaxLength(255, { message: 'Email must not exceed 255 characters' })
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @Field()
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(100, { message: 'Password must not exceed 100 characters' })
  password: string;

  @Field(() => Role)
  @IsNotEmpty({ message: 'Role is required' })
  role: Role = Role.USER;

  @Field(() => CreateProfileInputDto, { nullable: true })
  @IsOptional()
  profile?: CreateProfileInputDto;
}
