import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dtos/create-hashtag.dto';

@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Post()
  async createHashtag(@Body() dto: CreateHashtagDto) {
    return await this.hashtagService.createHashtag(dto);
  }

  @Get()
  async getAllHashtags() {
    return await this.hashtagService.getAllHashtags();
  }

  @Get(':id')
  async getHashtagById(@Param('id', ParseIntPipe) id: number) {
    return await this.hashtagService.getHashtagById(id);
  }

  @Patch(':id')
  async updateHashtag(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<CreateHashtagDto>,
  ) {
    return await this.hashtagService.updateHashtag(id, body);
  }

  @Delete(':id')
  async deleteHashtag(@Param('id', ParseIntPipe) id: number) {
    return await this.hashtagService.deleteHashtag(id);
  }
}
