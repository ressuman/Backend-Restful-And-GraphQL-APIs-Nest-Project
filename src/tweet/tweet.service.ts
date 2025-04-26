import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TweetService {
  constructor(private readonly userService: UsersService) {}

  tweets: {
    text: string;
    date: Date;
    userId: number;
  }[] = [
    {
      text: 'Hello World',
      date: new Date('2023-10-01'),
      userId: 1,
    },
    {
      text: 'Hello World 2',
      date: new Date('2023-10-02'),
      userId: 2,
    },
    {
      text: 'Hello World 3',
      date: new Date('2023-10-03'),
      userId: 1,
    },
    {
      text: 'Hello World 4',
      date: new Date('2023-10-04'),
      userId: 1,
    },
    {
      text: 'Hello World 5',
      date: new Date('2023-10-05'),
      userId: 2,
    },
  ];

  getTweets() {
    return this.tweets;
  }

  getTweetsByUserId(userId: number) {
    const user = this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const tweets = this.tweets.filter((tweet) => tweet.userId === userId);

    const userTweets = tweets.map((tweet) => ({
      text: tweet.text,
      date: tweet.date,
      userId: tweet.userId,
      userName: user.name,
    }));

    return {
      message: `Tweets for user ${user.name}`,
      tweets: userTweets,
    };
  }
}
