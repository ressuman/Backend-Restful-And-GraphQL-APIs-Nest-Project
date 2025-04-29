import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProfileDto {
  @IsString({ message: 'First name must be a string' })
  @MaxLength(100, { message: 'First name must not exceed 100 characters' })
  @MinLength(3, { message: 'First name must be at least 3 characters long' })
  @IsOptional()
  firstName?: string;

  @IsString({ message: 'Last name must be a string' })
  @MaxLength(100, { message: 'Last name must not exceed 100 characters' })
  @MinLength(3, { message: 'Last name must be at least 3 characters long' })
  @IsOptional()
  lastName?: string;

  @IsString({ message: 'Gender must be a string' })
  @IsOptional()
  @IsIn(['male', 'female', 'other'], {
    message: 'Gender must be one of: male, female, or other',
  })
  gender?: string;

  @IsString({ message: 'Bio must be a string' })
  @IsOptional()
  bio?: string;

  @IsString({ message: 'Profile image must be a string' })
  @IsOptional()
  profileImage?: string;

  @IsDate({ message: 'Date of birth must be a valid date of birth' })
  @IsOptional()
  @IsIn(['YYYY-MM-DD'], {
    message: 'Date of birth must be in the format YYYY-MM-DD',
  })
  dateOfBirth?: Date;
}
