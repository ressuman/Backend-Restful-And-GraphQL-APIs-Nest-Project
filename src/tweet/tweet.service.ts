import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { UpdateTweetDto } from './dtos/update-tweet.dto';
import { PaginationQueryDto } from '../common/pagination/dtos/pagination-query.dto';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { PaginationInterface } from 'src/common/pagination/pagination.interface';
import { ActiveUserTypeInterface } from 'src/auth/interfaces/active-user-type.interface';

@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UsersService,

    private readonly hashtagService: HashtagService,

    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,

    private readonly paginationService: PaginationService,
  ) {}

  // Get all tweets
  async getAllTweets(userId: number) {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User with userId ' + userId + ' not found');
    }

    const tweets = await this.tweetRepository.find({
      relations: {
        user: true,
        hashtags: true,
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

  // Get all tweets by pagination query
  async getTweets(
    userId: number,
    paginationQueryDto: PaginationQueryDto,
  ): Promise<PaginationInterface<Tweet>> {
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User with userId ' + userId + ' not found');
    }

    return await this.paginationService.paginatedQuery(
      paginationQueryDto,
      this.tweetRepository,
      {
        //where: {
        user: {
          id: userId,
        },
        //},

        // If the page=1 and limit=10, then skip=0 and take=10, and if page=2 and limit=10, then skip=10 and take=10, and if page=3 and limit=10, then skip=20 and take=10

        // Formulas for page
        // Page 1: (1 - 1) * (10) = 0
        // Page 2: (2 - 1) * (10) = 10
        // Page 3: (3 - 1) * (10) = 20
        // Page 4: (4 - 1) * (10) = 30

        // Formulas for skip
        // Page 1: (page - 1) * limit

        // skip:
        //   ((paginationQueryDto.page ?? 1) - 1) * (paginationQueryDto.limit ?? 10), // skip first 10 tweets
        // take: paginationQueryDto.limit ?? 10, // take next 10 tweets
      },
    );

    // return {
    //   message: 'Tweets fetched successfully',
    //   tweets,
    // };
  }

  async createTweet(
    createTweetDto: CreateTweetDto,
    // activeUser: ActiveUserTypeInterface,
    userId: number,
  ) {
    // const user = await this.userService.findUserById(createTweetDto.userId);
    // const user = await this.userService.findUserById(activeUser.sub);
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // const hashtags = await this.hashtagService.findHashtags(
    //   createTweetDto.hashtags || [],
    // );

    // Safely get hashtags array from IDs (if any provided)
    const hashtags =
      createTweetDto.hashtags && createTweetDto.hashtags.length > 0
        ? (await this.hashtagService.findHashtags(createTweetDto.hashtags))
            .hashtag
        : [];

    const tweet = this.tweetRepository.create({
      text: createTweetDto.text,
      image: createTweetDto.image,
      user,
      hashtags,
    });

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

  /**
   * This TypeScript function updates a tweet with the provided data and returns a success message along
   * with the updated tweet.
   * @param {UpdateTweetDto} updateTweetDto - The `updateTweetDto` parameter in the `updateTweet`
   * function is an object that contains the data needed to update a tweet. It typically includes the
   * following properties:
   * @returns The `updateTweet` function returns an object with two properties: `message` and `tweet`.
   * The `message` property contains the string 'Tweet updated successfully', and the `tweet` property
   * contains the updated tweet object after the modifications have been applied.
   */
  async updateTweet(updateTweetDto: UpdateTweetDto) {
    const tweet = await this.tweetRepository.findOne({
      where: { id: updateTweetDto.id },
      relations: ['hashtags'], // make sure to load existing hashtags
    });

    if (!tweet) {
      throw new Error('Tweet not found');
    }

    tweet.text = updateTweetDto.text ?? tweet.text;
    tweet.image = updateTweetDto.image ?? tweet.image;

    if (updateTweetDto.hashtags !== undefined) {
      if (updateTweetDto.hashtags.length > 0) {
        const hashtags = await this.hashtagService.findHashtags(
          updateTweetDto.hashtags,
        );
        tweet.hashtags = hashtags.hashtag;
      } else {
        // Empty array means clear all hashtags
        tweet.hashtags = [];
      }
    }

    await this.tweetRepository.save(tweet);

    return {
      message: 'Tweet updated successfully',
      tweet,
    };
  }

  // async updateTweet(updateTweetDto: UpdateTweetDto) {
  //   const tweet = await this.tweetRepository.findOneBy({
  //     id: updateTweetDto.id,
  //   });

  //   if (!tweet) {
  //     throw new Error('Tweet not found');
  //   }

  //   tweet.text = updateTweetDto.text ?? tweet.text;
  //   tweet.image = updateTweetDto.image ?? tweet.image;

  //   if (updateTweetDto.hashtags && updateTweetDto.hashtags.length > 0) {
  //     const hashtags = await this.hashtagService.findHashtags(
  //       updateTweetDto.hashtags,
  //     );
  //     tweet.hashtags = hashtags.hashtag;
  //   }

  //   await this.tweetRepository.save(tweet);

  //   return {
  //     message: 'Tweet updated successfully',
  //     tweet,
  //   };
  // }

  async deleteTweet(id: number) {
    await this.tweetRepository.delete({ id });

    return {
      message: 'Tweet deleted successfully',
      id,
    };
  }
}
