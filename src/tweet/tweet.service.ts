import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dtos/create-tweet.dto';

@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UsersService,

    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  async getTweets(userId: number) {
    const tweets = await this.tweetRepository.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: userId,
        },
      },
    });

    return {
      message: 'Tweets fetched successfully',
      tweets,
    };
  }

  async createTweet(createTweetDto: CreateTweetDto) {
    const user = await this.userService.findUserById(createTweetDto.userId);

    if (!user) {
      throw new Error('User not found');
    }

    const tweet = this.tweetRepository.create({ ...createTweetDto, user });

    await this.tweetRepository.save(tweet);

    return {
      message: 'Tweet created successfully',
      tweet,
    };
  }

  async getTweetById(id: string) {
    return await this.tweetRepository.findOne({
      where: {
        id: Number(id),
      },
      relations: ['user'],
    });
  }

  async updateTweet(id: string, data: any) {
    return await this.tweetRepository.update(id, data);
  }

  async deleteTweet(id: string) {
    return await this.tweetRepository.delete(id);
  }
}
