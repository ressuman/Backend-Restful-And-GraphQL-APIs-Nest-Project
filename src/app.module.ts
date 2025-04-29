import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
//import { AuthModule } from './auth/auth.module';
//import { TweetModule } from './tweet/tweet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/user.entity';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    UsersModule,
    //AuthModule,
    //TweetModule,
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
    // Synchronous approach which is not recommended in production
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [], // Add any dependencies here
      useFactory: () => ({
        type: 'postgres',
        //entities: [Users],
        autoLoadEntities: true,
        synchronize: true,
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '@R10581878e',
        database: 'nestjs',
      }),
    }),
    ProfileModule,
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
