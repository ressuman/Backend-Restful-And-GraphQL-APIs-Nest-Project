import { faker } from '@faker-js/faker';
import 'dotenv/config';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  //JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  DataSource,
} from 'typeorm';
import { forwardRef } from '@nestjs/common';

// Define Role enum
export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(Role, { name: 'Role' });

// User entity
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
    nullable: true,
    select: false,
  })
  password: string;

  @Field(() => forwardRef(() => Profile))
  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    nullable: true,
  })
  profile: Profile;

  @Field(() => [forwardRef(() => Post)])
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @Field()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @Field()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updatedAt: Date;
}

// Profile entity
@ObjectType()
@Entity()
export class Profile {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    type: 'text',
    nullable: true,
  })
  bio: string;

  @Field()
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  avatar: string;

  @Field(() => forwardRef(() => User))
  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Field()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @Field()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updatedAt: Date;
}

// Post entity
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

  @Field(() => forwardRef(() => User))
  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: User;

  @Field(() => [forwardRef(() => Tag)])
  @ManyToMany(() => Tag, (tag) => tag.posts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'post_tags',
  })
  tags: Tag[];

  @Field()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @Field()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updatedAt: Date;
}

// Tag entity
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

  @Field(() => [forwardRef(() => Post)])
  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];

  @Field()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @Field()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updatedAt: Date;
}

// Configure DataSource with individual environment variables
// const dataSource = new DataSource({
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT, 10),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   entities: [User, Profile, Post, Tag],
//   synchronize: false,
// });
const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '@R10581878e',
  database: 'nestjs_graphql',
  entities: [User, Profile, Post, Tag],
  //synchronize: process.env.DB_SYNC === 'true',
  synchronize: true,
  logging: true, // Enable to see SQL queries in console
});

async function seed() {
  try {
    await dataSource.initialize();
    console.log('Database connection established.');

    const userRepository = dataSource.getRepository(User);
    const profileRepository = dataSource.getRepository(Profile);
    const postRepository = dataSource.getRepository(Post);
    const tagRepository = dataSource.getRepository(Tag);

    // Seed tags with explicit type annotation
    const tags: Tag[] = []; // Explicitly typed as Tag[]
    for (let i = 0; i < 5; i++) {
      const tag = tagRepository.create({ name: faker.word.noun() });
      tags.push(await tagRepository.save(tag)); // This now works correctly
    }

    // Seed users, profiles, and posts
    for (let i = 0; i < 10; i++) {
      const profile = profileRepository.create({
        bio: faker.lorem.sentence(),
        avatar: faker.image.avatar(),
      });

      const user = userRepository.create({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        profile,
      });

      const savedUser = await userRepository.save(user);

      for (let j = 0; j < 10; j++) {
        const post = postRepository.create({
          title: faker.lorem.words(5),
          content: faker.lorem.paragraph(),
          user: savedUser,
          tags: faker.helpers.arrayElements(tags), // Works fine with Tag[]
        });

        await postRepository.save(post);
      }
    }

    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await dataSource.destroy();
  }
}

seed();
