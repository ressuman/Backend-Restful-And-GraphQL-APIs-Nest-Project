import { Controller } from '@nestjs/common';
import { TweetService } from './tweet.service';

// http://localhost:3000/tweet
@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}
}
