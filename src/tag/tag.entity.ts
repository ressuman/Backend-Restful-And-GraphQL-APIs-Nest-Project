import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/post/post.entity';

@ObjectType()
@Entity()
export class Tag {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string;

  @Field(() => [Post])
  @ManyToMany(() => Post, (post) => post.tags)
  posts: Promise<Post[]>;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @DeleteDateColumn()
  deletedAt: Date;
}
