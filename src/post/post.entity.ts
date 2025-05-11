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

  // @Field(() => User)
  // @ManyToOne(() => User, (user) => user.posts, {
  //   onDelete: 'CASCADE',
  //   nullable: false,
  // })
  // user: Promise<User>;

  // @Field(() => [Tag])
  // @ManyToMany(() => Tag, (tag) => tag.posts, {
  //   onDelete: 'CASCADE',
  //   nullable: false,
  // })
  // @JoinTable({
  //   name: 'post_tags',
  // })
  // tags: Promise<Tag[]>;
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
    nullable: false,
    eager: true,
  })
  user: User;

  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.posts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'post_tags',
  })
  tags: Tag[];

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
