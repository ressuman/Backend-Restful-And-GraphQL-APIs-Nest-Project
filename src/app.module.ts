import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TweetModule } from './tweet/tweet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { Users } from './users/user.entity';
import { ProfileModule } from './profile/profile.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
//import { appConfig } from './config/app.config';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import envValidation, { configValidationSchema } from './config/env.validation';

const ENV = process.env.NODE_ENV;
console.log(ENV);

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TweetModule,
    // Synchronous approach which is not recommended in production
    //   TypeOrmModule.forRoot({
    //     type: 'postgres',
    //     entities: [],
    //     host: 'localhost',
    //     port: 5432,
    //     username: 'postgres',
    //     password: '@R10581878e',
    //     database: 'nestjs',
    //     //autoLoadEntities: true,
    //     synchronize: true,
    //   }),
    // ],
    /* Synchronous approach which is not recommended in production */

    // TypeORM configuration using flat environment variable keys (e.g., DB_HOST, DB_PORT)
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService], // Add any dependencies here
    //   useFactory: (configService: ConfigService) => ({
    //     type: configService.get<string>('DB_TYPE') as
    //       | 'postgres'
    //       | 'mysql'
    //       | 'sqlite'
    //       | 'mariadb'
    //       | 'aurora-mysql'
    //       | 'oracle'
    //       | 'mssql', // Ensure the type matches the expected database type
    //     //entities: [Users],
    //     autoLoadEntities: true,
    //     synchronize: true,
    //     host: configService.get<string>('DB_HOST'),
    //     //port: +(configService.get<number>('DB_PORT') ?? 5432),
    //     port: Number(configService.get<number>('DB_PORT')),
    //     username: configService.get<string>('DB_USERNAME'),
    //     password: configService.get<string>('DB_PASSWORD'),
    //     database: configService.get<string>('DB_NAME'),
    //   }),
    // }),

    // TypeORM configuration using nested keys from a custom config (e.g., database.host, database.port)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('database.type') as
          | 'postgres'
          | 'mysql'
          | 'sqlite'
          | 'mariadb'
          | 'aurora-mysql'
          | 'oracle'
          | 'mssql',
        autoLoadEntities: configService.get<boolean>(
          'database.autoLoadEntities',
        ),
        synchronize: configService.get<boolean>('database.synchronize'),
        host: configService.get<string>('database.host'),
        port: Number(configService.get<number>('database.port')),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
      }),
    }),
    ProfileModule,
    HashtagModule,
    ConfigModule.forRoot({
      isGlobal: true,
      /* ENV DIFFERENT CONFIGURATIONS */

      // This way must be explicitly set as the env file is not in the root- located in the src folder
      // envFilePath: './src/.env',

      // This way is the default or can explicitly set it-when the env file is in the root
      //envFilePath: '.env',
      //envFilePath: '.env.template',

      // Loading env environment dynamically
      //envFilePath: !ENV ? '.env' : `.env.${ENV.trim()}`,
      envFilePath: ENV ? `.env.${ENV.trim()}` : '.env',

      // Using custom configuration env fil
      //load: [appConfig],
      load: [appConfig, databaseConfig],
      validationSchema: envValidation,
      //validationSchema: configValidationSchema,
    }),
  ],
  //  TypeOrmModule.forRootAsync({
  //     useFactory: async () => ({
  //       type: 'postgres',
  //       host: process.env.DB_HOST,
  //       port: +process.env.DB_PORT,
  //       username: process.env.DB_USERNAME,
  //       password: process.env.DB_PASSWORD,
  //       database: process.env.DB_DATABASE,
  //       autoLoadEntities: true,
  //       synchronize: true,
  //     }),
  //   }),
  // ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
