import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class GetUserParamDto {
  @Transform(
    ({ value }) =>
      value === 'true' ? true : value === 'false' ? false : value,
    { toClassOnly: true },
  )
  @IsBoolean({ message: 'isMarried must be true or false' })
  @IsOptional()
  isMarried: boolean;
}
