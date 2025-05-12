import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Tag } from 'src/tag/tag.entity';

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

  @Field()
  @Column({
    type: 'text',
    nullable: false,
  })
  content: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
    nullable: false,
    //eager: true,
  })
  //user: Promise<User>;
  user: User;

  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.posts, {
    onDelete: 'CASCADE',
    nullable: false,
    eager: true,
  })
  @JoinTable({
    name: 'post_tags',
  })
  //tags: Promise<Tag[]>;
  tags: Tag[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ nullable: true })
  @DeleteDateColumn()
  deletedAt: Date;
}
