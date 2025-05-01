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
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { UpdateTweetDto } from './dtos/update-tweet.dto';

// http://localhost:3000/tweet
@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  // GET /tweet
  @Get(':userid')
  async getAllTweets(@Param('userid', ParseIntPipe) userId: number) {
    return await this.tweetService.getTweets(userId);
  }

  // POST /tweet
  @Post()
  async createTweet(@Body() tweet: CreateTweetDto) {
    return await this.tweetService.createTweet(tweet);
  }

  // GET /tweet/:id
  @Get(':id')
  async getTweetById(@Param('id', ParseIntPipe) id: number) {
    return await this.tweetService.getTweetById(id.toString());
  }

  // // PATCH /tweet/:id
  // @Patch(':id')
  // async updateTweet(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() body: Omit<UpdateTweetDto, 'id'>,
  // ) {
  //   return await this.tweetService.updateTweet({ ...body, id });
  // }
  @Patch()
  async updateTweet(@Body() tweet: UpdateTweetDto) {
    return await this.tweetService.updateTweet(tweet);
  }

  // DELETE /tweet/:id
  @Delete(':id')
  async deleteTweet(@Param('id', ParseIntPipe) id: number) {
    return await this.tweetService.deleteTweet(id);
  }
}
