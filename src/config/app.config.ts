import { registerAs } from '@nestjs/config';

// export const appConfig = () => {
//   return {
//     // environment: {
//     //   NODE_ENV: process.env.NODE_ENV ?? 'production',
//     // },
//     environment: process.env.NODE_ENV ?? 'production',

//     database: {
//       type: process.env.DB_TYPE,
//       host: process.env.DB_HOST ?? 'localhost',
//       port: parseInt(process.env.DB_PORT ?? '5432'),
//       username: process.env.DB_USERNAME,
//       password: process.env.DB_PASSWORD,
//       name: process.env.DB_NAME,
//       synchronize: process.env.DB_SYNC === 'true',
//       autoLoadEntities: process.env.DB_AUTO_LOAD === 'true',
//     },
//   };
// };

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'production',
  // database: {
  //   type: process.env.DB_TYPE,
  //   host: process.env.DB_HOST ?? 'localhost',
  //   port: parseInt(process.env.DB_PORT ?? '5432'),
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   name: process.env.DB_NAME,
  //   synchronize: process.env.DB_SYNC === 'true',
  //   autoLoadEntities: process.env.DB_AUTO_LOAD === 'true',
  // },
}));
