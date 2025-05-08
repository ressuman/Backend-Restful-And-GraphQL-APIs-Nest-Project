import { Profile } from 'src/profile/profile.entity';
import { Tweet } from 'src/tweet/tweet.entity';
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

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  password: string;

  /* The code snippet you provided is defining a relationship between the `Users` entity and the
`Profile` entity using TypeORM decorators in TypeScript. */
  @OneToOne(() => Profile, (profile) => profile.user, {
    // This will automatically insert or update or remove or recover or soft-remove the related profile when the user is saved
    //cascade: true,
    // This will automatically insert or update the related profile when the user is saved
    cascade: [
      'insert',
      // 'update'
    ],
    //eager: true,
  })
  //@JoinColumn()
  profile?: Profile;

  @OneToMany(
    () => Tweet,
    (tweet) => tweet.user,
    // {
    //   //cascade: true,
    // }
  )
  tweets: Tweet[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
