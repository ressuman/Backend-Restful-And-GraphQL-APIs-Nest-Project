import { Hashtag } from 'src/hashtag/hashtag.entity';
import { Users } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  text: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  image?: string;

  @ManyToOne(
    () => Users,
    (user) => user.tweets,
    //{ eager: true },
    // {
    //   //onDelete: 'CASCADE',
    // }
  )
  user: Users;

  @ManyToMany(() => Hashtag)
  @JoinTable({ name: 'tweet_hashtag' })
  hashtag: Hashtag;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
