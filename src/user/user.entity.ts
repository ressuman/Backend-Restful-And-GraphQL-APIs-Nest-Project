import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from 'src/enums/role.enum';
import { Profile } from 'src/profile/profile.entity';
import { Post } from 'src/post/post.entity';
//import { Exclude } from 'class-transformer';

@ObjectType()
@Entity()
export class User {
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  username: string;

  @Field()
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  email: string;

  @Field(() => Role)
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
    nullable: false,
  })
  role: Role;

  @Column({
    type: 'varchar',
    nullable: false,
    //select: false,
    length: 100,
  })
  password: string;

  @Field(() => Profile, { nullable: true })
  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    nullable: true,
    //eager: true,
  })
  @JoinColumn()
  //profile?: Promise<Profile>;
  profile: Profile;

  //@Field(() => [Post])
  //@Field(() => [Post], { nullable: true })
  @Field(() => [Post], { nullable: 'items' })
  @OneToMany(
    () => Post,
    (post) => post.user,
    //{ lazy: true }
  )
  //posts: Promise<Post[]>;
  posts: Post[];

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
