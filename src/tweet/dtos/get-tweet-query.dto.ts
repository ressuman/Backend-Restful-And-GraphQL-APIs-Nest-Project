import { IntersectionType } from '@nestjs/mapped-types';
import { IsDate, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetTweetQueryBaseDto {
  @IsOptional()
  @IsDate({ message: 'Start date must be a valid date' })
  startDate?: Date;

  @IsOptional()
  @IsDate({ message: 'End date must be a valid date' })
  endDate?: Date;
}

export class GetTweetQueryDto extends IntersectionType(
  GetTweetQueryBaseDto,
  PaginationQueryDto,
) {}
