import { InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInputDto } from './create-user.input.dto';

@InputType()
export class UpdateUserInputDto extends PartialType(CreateUserInputDto) {}
