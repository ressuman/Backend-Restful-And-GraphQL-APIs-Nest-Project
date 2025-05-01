import { Injectable, NotFoundException } from '@nestjs/common';
import { Hashtag } from './hashtag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateHashtagDto } from './dtos/create-hashtag.dto';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  async createHashtag(createHashtagDto: CreateHashtagDto) {
    const hashtag = this.hashtagRepository.create(createHashtagDto);
    await this.hashtagRepository.save(hashtag);

    return {
      message: 'Hashtag created successfully',
      hashtag,
    };
  }

  async findHashtags(hashtags: number[]) {
    const hashtag = await this.hashtagRepository.find({
      where: {
        id: In(hashtags),
      },
    });
    return {
      message: 'Hashtags fetched successfully',
      hashtag,
    };
  }

  async getAllHashtags() {
    const hashtags = await this.hashtagRepository.find();
    return {
      message: 'All hashtags fetched successfully',
      hashtags,
    };
  }

  async getHashtagById(id: number) {
    const hashtag = await this.hashtagRepository.findOneBy({ id });
    if (!hashtag) {
      throw new NotFoundException('Hashtag not found');
    }
    return hashtag;
  }

  async updateHashtag(id: number, data: Partial<CreateHashtagDto>) {
    const hashtag = await this.hashtagRepository.findOneBy({ id });
    if (!hashtag) {
      throw new NotFoundException('Hashtag not found');
    }

    await this.hashtagRepository.update(id, data);
    const updated = await this.hashtagRepository.findOneBy({ id });

    return {
      message: 'Hashtag updated successfully',
      hashtag: updated,
    };
  }

  async deleteHashtag(id: number) {
    // const hashtag = await this.hashtagRepository.findOneBy({ id });
    // if (!hashtag) {
    //   throw new NotFoundException('Hashtag not found');
    // }

    await this.hashtagRepository.delete({ id });
    return { message: 'Hashtag deleted successfully', id };
  }

  async softDeleteHashtag(id: number) {
    await this.hashtagRepository.softDelete({ id });
    return { message: 'Hashtag deleted softly successfully', id };
  }
}
