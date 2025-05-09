import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/post/post.entity';

@ObjectType()
@Entity()
export class Tag {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Post])
  @ManyToMany(() => Post, (post) => post.tags)
  posts: Promise<Post[]>;
}
