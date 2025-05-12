import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsUrl,
  MaxLength,
  Min,
  IsOptional,
} from 'class-validator';

@InputType()
export class CreateProfileInputDto {
  @Field()
  @IsString({ message: 'Bio must be a string' })
  @IsOptional()
  @MaxLength(500, { message: 'Bio must not exceed 500 characters' })
  bio?: string;

  @Field()
  @IsUrl({}, { message: 'Avatar must be a valid URL' })
  @IsOptional()
  @MaxLength(255, { message: 'Avatar URL must not exceed 255 characters' })
  avatar?: string;

  // @Field(() => Int)
  // @IsInt({ message: 'User ID must be an integer' })
  // @IsNotEmpty({ message: 'User ID is required' })
  // @Min(1, { message: 'User ID must be a positive integer' })
  // userId: number;
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt({ message: 'User ID must be an integer' })
  @Min(1, { message: 'User ID must be a positive integer' })
  userId?: number;
}
