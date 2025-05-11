// import { faker } from '@faker-js/faker';
// import { Client } from 'pg';
// import * as dotenv from 'dotenv';

// // Load environment variables
// dotenv.config();

// // Define Role enum to match your database
// enum Role {
//   ADMIN = 'ADMIN',
//   USER = 'USER',
// }

// // Define interfaces to match your entity structures
// interface Tag {
//   id: number;
//   name: string;
// }

// interface Profile {
//   id: number;
//   bio: string;
//   avatar: string;
// }

// interface User {
//   id: number;
//   username: string;
//   email: string;
//   role: Role;
//   profileId: number;
// }

// interface Post {
//   id: number;
//   title: string;
//   content: string;
//   userId: number;
// }

// // Create a PostgreSQL client using the environment variables
// const client = new Client({
//   host: process.env.DB_HOST || 'localhost',
//   port: parseInt(process.env.DB_PORT || '5432'),
//   user: process.env.DB_USERNAME || 'postgres',
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME || 'nestjs_graphql',
// });

// async function seed() {
//   try {
//     // Connect to the database
//     await client.connect();
//     console.log('Connected to PostgreSQL database');

//     // Create tags
//     const tags: Tag[] = [];
//     for (let i = 0; i < 5; i++) {
//       const tagName = faker.word.noun();
//       const tagResult = await client.query(
//         `INSERT INTO tag (name, "createdAt", "updatedAt")
//          VALUES ($1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
//          RETURNING id, name`,
//         [tagName],
//       );
//       tags.push(tagResult.rows[0] as Tag);
//     }
//     console.log(`Created ${tags.length} tags`);

//     // Create users with profiles and posts
//     for (let i = 0; i < 10; i++) {
//       // Create profile first
//       const bio = faker.lorem.sentence();
//       const avatar = faker.image.avatar();

//       const profileResult = await client.query(
//         `INSERT INTO profile (bio, avatar, "createdAt", "updatedAt")
//          VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
//          RETURNING id`,
//         [bio, avatar],
//       );
//       const profileId = profileResult.rows[0].id;

//       // Create user with reference to profile
//       const username = faker.internet.userName();
//       const email = faker.internet.email();

//       const userResult = await client.query(
//         `INSERT INTO "user" (username, email, role, password, "createdAt", "updatedAt")
//          VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
//          RETURNING id`,
//         [username, email, Role.USER, faker.internet.password()],
//       );
//       const userId = userResult.rows[0].id;

//       // Update profile with user reference
//       await client.query(`UPDATE profile SET "userId" = $1 WHERE id = $2`, [
//         userId,
//         profileId,
//       ]);

//       // Create posts for the user
//       for (let j = 0; j < 5; j++) {
//         const title = faker.lorem.words(5);
//         const content = faker.lorem.paragraphs(2);

//         const postResult = await client.query(
//           `INSERT INTO post (title, content, "userId", "createdAt", "updatedAt")
//            VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
//            RETURNING id`,
//           [title, content, userId],
//         );
//         const postId = postResult.rows[0].id;

//         // Assign random tags to the post (between 1-3 tags)
//         const randomTags = faker.helpers.arrayElements(
//           tags,
//           Math.floor(Math.random() * 3) + 1,
//         );

//         for (const tag of randomTags) {
//           await client.query(
//             `INSERT INTO post_tags ("postId", "tagId")
//              VALUES ($1, $2)`,
//             [postId, tag.id],
//           );
//         }
//       }
//     }

//     console.log('Database seeding completed successfully!');
//   } catch (error) {
//     console.error('Error seeding database:', error);
//     throw error; // Re-throw to see full stack trace
//   } finally {
//     // Close the database connection
//     await client.end();
//     console.log('Database connection closed');
//   }
// }

// // Execute the seed function
// seed();
