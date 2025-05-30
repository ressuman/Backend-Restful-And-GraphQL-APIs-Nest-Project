import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { UpdateTweetDto } from './dtos/update-tweet.dto';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import { GetTweetQueryDto } from './dtos/get-tweet-query.dto';
import { ActiveUserDecorator } from 'src/auth/decorators/active-user.decorator';

// http://localhost:3000/tweet
@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  // Get all tweets without pagination
  // GET /tweet
  @Get(':userid')
  async getTweets(@Param('userid', ParseIntPipe) userId: number) {
    return await this.tweetService.getAllTweets(userId);
  }

  // Get all tweets by pagination
  // http://localhost:3000/tweet/user/:userid?page=1&limit=10
  @Get('user/:userid')
  async getAllTweets(
    @Param('userid', ParseIntPipe) userId: number,
    @Query() paginationQueryDto: PaginationQueryDto,
    //@Query() getTweetQueryDto: GetTweetQueryDto,
  ) {
    console.log(paginationQueryDto);
    //console.log(getTweetQueryDto);
    // return await this.tweetService.getTweets(userId, getTweetQueryDto);
    return await this.tweetService.getTweets(userId, paginationQueryDto);
  }

  // POST /tweet
  @Post()
  async createTweet(
    @Body() tweet: CreateTweetDto,
    //@ActiveUserDecorator() user,
    @ActiveUserDecorator('sub') userId,
    // @ActiveUserDecorator('email') user,
  ) {
    //console.log(user);
    return await this.tweetService.createTweet(tweet, userId);
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
