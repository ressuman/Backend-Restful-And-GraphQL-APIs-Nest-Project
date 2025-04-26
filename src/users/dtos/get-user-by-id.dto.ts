import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUserByIdDto {
  @Type(() => Number)
  @IsInt({ message: 'ID must be an integer' })
  @Min(1, { message: 'ID must be at least 1' })
  id: number;
}
