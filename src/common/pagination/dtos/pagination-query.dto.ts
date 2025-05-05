//import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive({ message: 'Page must be a positive number' })
  //@Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsPositive({ message: 'Limit must be a positive number' })
  //@Type(() => Number)
  limit?: number = 10;
}
