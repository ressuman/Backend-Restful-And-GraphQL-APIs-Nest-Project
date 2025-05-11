import { InputType, PartialType } from '@nestjs/graphql';
import { CreateTagInputDto } from './create-tag.input.dto';

@InputType()
export class UpdateTagInputDto extends PartialType(CreateTagInputDto) {}
