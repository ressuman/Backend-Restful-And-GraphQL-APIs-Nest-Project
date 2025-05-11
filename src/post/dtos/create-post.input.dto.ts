import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsArray,
  MaxLength,
  MinLength,
  ArrayMinSize,
  Min,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class CreatePostInputDto {
  @Field()
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  @MaxLength(255, { message: 'Title must not exceed 255 characters' })
  @Transform(({ value }) => value.trim())
  title: string;

  @Field()
  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content is required' })
  @MinLength(10, { message: 'Content must be at least 10 characters long' })
  content: string;

  @Field(() => Int)
  @IsInt({ message: 'User ID must be an integer' })
  @IsNotEmpty({ message: 'User ID is required' })
  @Min(1, { message: 'User ID must be a positive integer' })
  userId: number;

  @Field(() => [Int])
  @IsArray({ message: 'Tag IDs must be an array' })
  @ArrayMinSize(1, { message: 'At least one tag is required' })
  @IsInt({ each: true, message: 'Each tag ID must be an integer' })
  @Min(1, { each: true, message: 'Each tag ID must be a positive integer' })
  @IsOptional()
  tagIds?: number[];
}
