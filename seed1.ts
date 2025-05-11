import {
  DataSource,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { faker } from '@faker-js/faker';
import { Field, ObjectType, Int, registerEnumType } from '@nestjs/graphql';
// 1. Define Role Enum
export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
registerEnumType(Role, { name: 'Role' });

// 2. Define entities in proper order
@ObjectType()
@Entity()
export class Tag {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: 'varchar', length: 50, unique: true })
  name!: string;

  @Field(() => [Post])
  @ManyToMany(() => Post, (post) => post.tags)
  posts!: Post[];
}

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Field()
  @Column({ type: 'text' })
  content!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  user!: User;

  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable()
  tags!: Tag[];
}

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: 'varchar', length: 50, unique: true })
  username!: string;

  @Field()
  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Field(() => Role)
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role!: Role;

  @Column({ type: 'varchar', nullable: true, select: false })
  password!: string;

  @Field(() => Profile)
  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile!: Profile;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];
}

@ObjectType()
@Entity()
export class Profile {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: 'text', nullable: true })
  bio!: string;

  @Field()
  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar!: string;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.profile)
  user!: User;
}

// 4. Database Configuration
const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '@R10581878e',
  database: 'nestjs_graphql',
  entities: [User, Profile, Post, Tag],
  synchronize: true,
  logging: true,
});

// 4. Seeding Logic
async function seed() {
  try {
    await dataSource.initialize();
    console.log('Database connected');

    const userRepo = dataSource.getRepository(User);
    const profileRepo = dataSource.getRepository(Profile);
    const postRepo = dataSource.getRepository(Post);
    const tagRepo = dataSource.getRepository(Tag);

    // Clear existing data
    await postRepo.delete({});
    await profileRepo.delete({});
    await userRepo.delete({});
    await tagRepo.delete({});

    // Seed Tags
    const tags = await Promise.all(
      ['technology', 'programming', 'graphql', 'nestjs'].map(async (name) => {
        const tag = tagRepo.create({ name });
        return tagRepo.save(tag);
      }),
    );

    // Seed Users with Profiles and Posts
    for (let i = 0; i < 5; i++) {
      const user = userRepo.create({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: i === 0 ? Role.ADMIN : Role.USER,
        profile: profileRepo.create({
          bio: faker.lorem.sentence(),
          avatar: faker.image.avatar(),
        }),
      });

      await userRepo.save(user);

      // Create Posts
      for (let j = 0; j < 3; j++) {
        const post = postRepo.create({
          title: faker.lorem.words(3),
          content: faker.lorem.paragraphs(2),
          user,
          tags: faker.helpers.arrayElements(tags, 2),
        });
        await postRepo.save(post);
      }
    }

    console.log('✅ Seeding completed successfully');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await dataSource.destroy();
  }
}

seed().catch((error) => {
  console.error('Unhandled error during seeding:', error);
});
