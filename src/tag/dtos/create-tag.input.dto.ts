import { Field, InputType } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class CreateTagInputDto {
  @Field()
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters' })
  @Matches(/^[a-zA-Z0-9\-_]+$/, {
    message: 'Name can only contain letters, numbers, hyphens, and underscores',
  })
  @Transform(({ value }) => value.trim().toLowerCase())
  name: string;
}
