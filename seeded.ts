import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
//import * as dotenv from 'dotenv';
//import { Role } from './src/enums/role.enum';
import { Role } from './src/enums/role.enum';
import { User } from './src/user/user.entity';
import { Profile } from './src/profile/profile.entity';
import { Post } from './src/post/post.entity';
import { Tag } from './src/tag/tag.entity';
// import { Role } from '@/enums/role.enum';
// import { User } from '@/user/user.entity';
// import { Profile } from '@/profile/profile.entity';
// import { Post } from '@/post/post.entity';
// import { Tag } from '@/tag/tag.entity';

// Load environment variables
//dotenv.config({ path: '.env.development' });

// Initialize DataSource with your PostgreSQL configuration
// const dataSource = new DataSource({
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT ?? '5432', 10),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   entities: [User, Profile, Post, Tag],
//   synchronize: process.env.DB_SYNC === 'true',
//   logging: true, // Enable to see SQL queries in console
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

// async function seed() {
//   try {
//     console.log('Initializing database connection...');
//     await dataSource.initialize();
//     console.log('Database connection established.');

//     const userRepository = dataSource.getRepository(User);
//     const profileRepository = dataSource.getRepository(Profile);
//     const postRepository = dataSource.getRepository(Post);
//     const tagRepository = dataSource.getRepository(Tag);

//     // Clear existing data (optional)
//     console.log('Clearing existing data...');
//     await postRepository.delete({});
//     await profileRepository.delete({});
//     await userRepository.delete({});
//     await tagRepository.delete({});

//     // Seed Tags
//     console.log('Seeding tags...');
//     const tags: Tag[] = [];
//     const tagNames = [
//       'technology',
//       'programming',
//       'graphql',
//       'nestjs',
//       'database',
//     ];

//     for (const name of tagNames) {
//       const tag = tagRepository.create({
//         name,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       });
//       tags.push(await tagRepository.save(tag));
//     }

//     // Seed Users with Profiles and Posts
//     console.log('Seeding users with profiles and posts...');
//     for (let i = 0; i < 5; i++) {
//       // Create Profile first
//       const profile = profileRepository.create({
//         bio: faker.lorem.sentence(),
//         avatar: faker.image.avatar(),
//         location: faker.location.city(),
//         website: faker.internet.url(),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       });

//       // Create User
//       const user = userRepository.create({
//         username: faker.internet.userName(),
//         email: faker.internet.email(),
//         password: faker.internet.password(),
//         role: i === 0 ? Role.ADMIN : Role.USER, // First user is admin
//         isVerified: faker.datatype.boolean(),
//         profile,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       });

//       const savedUser = await userRepository.save(user);

//       // Create Posts for each user
//       for (let j = 0; j < 3; j++) {
//         const post = postRepository.create({
//           title: faker.lorem.words(3),
//           content: faker.lorem.paragraphs(2),
//           user: savedUser,
//           tags: faker.helpers.arrayElements(tags, 2),
//           createdAt: new Date(),
//           updatedAt: new Date(),
//         });
//         await postRepository.save(post);
//       }
//     }

//     console.log('✅ Database seeding completed successfully!');
//   } catch (error) {
//     console.error('❌ Error seeding database:', error);
//   } finally {
//     await dataSource.destroy();
//     console.log('Database connection closed.');
//   }
// }

// async function seed() {
//   try {
//     console.log('Initializing database connection...');
//     await dataSource.initialize();
//     console.log('Database connection established.');

//     const userRepository = dataSource.getRepository(User);
//     const profileRepository = dataSource.getRepository(Profile);
//     const postRepository = dataSource.getRepository(Post);
//     const tagRepository = dataSource.getRepository(Tag);

//     // Clear existing data (optional)
//     console.log('Clearing existing data...');
//     await postRepository.delete({});
//     await profileRepository.delete({});
//     await userRepository.delete({});
//     await tagRepository.delete({});

//     // Seed Tags
//     console.log('Seeding tags...');
//     const tags: Tag[] = []; // Explicitly type the array
//     const tagNames = [
//       'technology',
//       'programming',
//       'graphql',
//       'nestjs',
//       'database',
//     ];

//     for (const name of tagNames) {
//       const tag = new Tag();
//       tag.name = name;
//       tag.createdAt = new Date();
//       tag.updatedAt = new Date();
//       const savedTag = await tagRepository.save(tag);
//       tags.push(savedTag);
//     }

//     // Seed Users with Profiles and Posts
//     console.log('Seeding users with profiles and posts...');
//     for (let i = 0; i < 5; i++) {
//       // Create Profile first
//       const profile = new Profile();
//       profile.bio = faker.lorem.sentence();
//       profile.avatar = faker.image.avatar();
//       profile.createdAt = new Date();
//       profile.updatedAt = new Date();
//       const savedProfile = await profileRepository.save(profile);

//       // Create User
//       const user = new User();
//       user.username = faker.internet.userName();
//       user.email = faker.internet.email();
//       user.password = faker.internet.password();
//       user.role = i === 0 ? Role.ADMIN : Role.USER;
//       user.profile = savedProfile;
//       user.createdAt = new Date();
//       user.updatedAt = new Date();
//       const savedUser = await userRepository.save(user);

//       // Update profile with user reference
//       savedProfile.user = savedUser;
//       await profileRepository.save(savedProfile);

//       // Create Posts for each user
//       for (let j = 0; j < 3; j++) {
//         const post = new Post();
//         post.title = faker.lorem.words(3);
//         post.content = faker.lorem.paragraphs(2);
//         post.user = savedUser;

//         // Select random tags (2 per post)
//         const postTags = faker.helpers.arrayElements(tags, 2);
//         post.tags = postTags;

//         post.createdAt = new Date();
//         post.updatedAt = new Date();
//         await postRepository.save(post);
//       }
//     }

//     console.log('✅ Database seeding completed successfully!');
//   } catch (error) {
//     console.error('❌ Error seeding database:', error);
//   } finally {
//     await dataSource.destroy();
//     console.log('Database connection closed.');
//   }
// }

async function seed() {
  console.log('Starting database seeding...');

  try {
    await dataSource.initialize();
    console.log('Database connected successfully');

    const userRepo = dataSource.getRepository(User);
    const profileRepo = dataSource.getRepository(Profile);
    const postRepo = dataSource.getRepository(Post);
    const tagRepo = dataSource.getRepository(Tag);

    // Clear existing data
    console.log('Clearing existing data...');
    await postRepo.delete({});
    await profileRepo.delete({});
    await userRepo.delete({});
    await tagRepo.delete({});

    // Seed Tags
    console.log('Seeding tags...');
    const tags: Tag[] = [];
    const tagNames = [
      'technology',
      'programming',
      'graphql',
      'nestjs',
      'database',
    ];

    for (const name of tagNames) {
      const tag = new Tag();
      tag.name = name;
      tag.createdAt = new Date();
      tag.updatedAt = new Date();
      tags.push(await tagRepo.save(tag));
    }

    // Seed Users with Profiles and Posts
    console.log('Seeding users...');
    for (let i = 0; i < 5; i++) {
      const profile = new Profile();
      profile.bio = faker.lorem.sentence();
      profile.avatar = faker.image.avatar();
      profile.createdAt = new Date();
      profile.updatedAt = new Date();
      const savedProfile = await profileRepo.save(profile);

      const user = new User();
      user.username = faker.internet.userName();
      user.email = faker.internet.email();
      user.password = faker.internet.password();
      user.role = i === 0 ? Role.ADMIN : Role.USER;
      user.profile = savedProfile;
      user.createdAt = new Date();
      user.updatedAt = new Date();
      const savedUser = await userRepo.save(user);

      // Update profile with user reference
      savedProfile.user = savedUser;
      await profileRepo.save(savedProfile);

      // Seed Posts
      console.log(`Seeding posts for user ${i + 1}...`);
      for (let j = 0; j < 3; j++) {
        const post = new Post();
        post.title = faker.lorem.words(3);
        post.content = faker.lorem.paragraphs(2);
        post.user = savedUser;
        post.tags = faker.helpers.arrayElements(tags, 2);
        post.createdAt = new Date();
        post.updatedAt = new Date();
        await postRepo.save(post);
      }
    }

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await dataSource.destroy();
    console.log('Database connection closed');
  }
}

// async function seed() {
//   try {
//     console.log('Initializing database connection...');
//     await dataSource.initialize();
//     console.log('Database connection established.');

//     const userRepository = dataSource.getRepository(User);
//     const profileRepository = dataSource.getRepository(Profile);
//     const postRepository = dataSource.getRepository(Post);
//     const tagRepository = dataSource.getRepository(Tag);

//     // Clear existing data (optional)
//     console.log('Clearing existing data...');
//     await postRepository.delete({});
//     await profileRepository.delete({});
//     await userRepository.delete({});
//     await tagRepository.delete({});

//     // Seed Tags
//     console.log('Seeding tags...');
//     const tags = [];
//     const tagNames = [
//       'technology',
//       'programming',
//       'graphql',
//       'nestjs',
//       'database',
//     ];

//     for (const name of tagNames) {
//       const tag = new Tag();
//       tag.name = name;
//       tag.createdAt = new Date();
//       tag.updatedAt = new Date();
//       tags.push(await tagRepository.save(tag));
//     }

//     // Seed Users with Profiles and Posts
//     console.log('Seeding users with profiles and posts...');
//     for (let i = 0; i < 5; i++) {
//       // Create Profile first
//       const profile = new Profile();
//       profile.bio = faker.lorem.sentence();
//       profile.avatar = faker.image.avatar();
//       profile.createdAt = new Date();
//       profile.updatedAt = new Date();
//       const savedProfile = await profileRepository.save(profile);

//       // Create User
//       const user = new User();
//       user.username = faker.internet.userName();
//       user.email = faker.internet.email();
//       user.password = faker.internet.password();
//       user.role = i === 0 ? Role.ADMIN : Role.USER;
//       user.profile = savedProfile;
//       user.createdAt = new Date();
//       user.updatedAt = new Date();
//       const savedUser = await userRepository.save(user);

//       // Update profile with user reference
//       savedProfile.user = savedUser;
//       await profileRepository.save(savedProfile);

//       // Create Posts for each user
//       for (let j = 0; j < 3; j++) {
//         const post = new Post();
//         post.title = faker.lorem.words(3);
//         post.content = faker.lorem.paragraphs(2);
//         post.user = savedUser;
//         post.tags = faker.helpers.arrayElements(tags, 2);
//         post.createdAt = new Date();
//         post.updatedAt = new Date();
//         await postRepository.save(post);
//       }
//     }

//     console.log('✅ Database seeding completed successfully!');
//   } catch (error) {
//     console.error('❌ Error seeding database:', error);
//   } finally {
//     await dataSource.destroy();
//     console.log('Database connection closed.');
//   }
// }

seed().catch((error) => {
  console.error('Unhandled error during seeding:', error);
});
