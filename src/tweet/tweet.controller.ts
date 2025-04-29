// import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
// import { TweetService } from './tweet.service';

// // http://localhost:3000/tweet
// @Controller('tweet')
// export class TweetController {
//   constructor(private readonly tweetService: TweetService) {}

//   // http://localhost:3000/tweet/:userid
//   @Get(':userid')
//   public getTweetByUserId(@Param('userid', ParseIntPipe) userid: number) {
//     return this.tweetService.getTweetsByUserId(userid);
//   }

//   // http://localhost:3000/tweet
//   @Get()
//   public getAllTweets() {
//     return this.tweetService.getTweets();
//   }
// }
