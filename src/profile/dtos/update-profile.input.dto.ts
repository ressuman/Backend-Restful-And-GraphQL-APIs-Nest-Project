import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProfileInputDto } from './create-profile.input.dto';

@InputType()
export class UpdateProfileInputDto extends PartialType(CreateProfileInputDto) {}
