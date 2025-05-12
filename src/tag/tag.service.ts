import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagInputDto } from './dtos/create-tag.input.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}
  async create(
    input: CreateTagInputDto,
  ): Promise<{ message: string; tag: Tag }> {
    const tag = this.tagRepository.create(input);
    await this.tagRepository.save(tag);
    return {
      message: 'Tag created successfully',
      tag,
    };
  }
}
