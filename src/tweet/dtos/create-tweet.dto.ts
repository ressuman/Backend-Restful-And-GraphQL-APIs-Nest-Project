import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTweetDto {
  @IsString({ message: 'Text must be a string' })
  @IsNotEmpty({ message: 'Text is required' })
  text: string;

  @IsString({ message: 'Image must be a string' })
  @IsOptional()
  image?: string;
}
