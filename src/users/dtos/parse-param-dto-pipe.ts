import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

@Injectable()
export class ParseParamDtoPipe implements PipeTransform {
  constructor(private readonly dtoClass: any) {}

  transform(value: any, metadata: ArgumentMetadata) {
    // 👉 manually check if param is supposed to be a boolean
    if (metadata.type === 'param' && typeof value === 'object') {
      for (const key in value) {
        if (value[key] === 'true') {
          value[key] = true;
        } else if (value[key] === 'false') {
          value[key] = false;
        }
      }
    }

    const object = plainToInstance(this.dtoClass, value);
    const errors = validateSync(object);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return object;
  }
}
