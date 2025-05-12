import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';

@ObjectType()
@Entity()
export class Profile {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({
    type: 'text',
    nullable: true,
  })
  bio?: string;

  @Field({ nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  avatar?: string;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  //@JoinColumn()
  @JoinColumn({ name: 'userId' })
  //user: Promise<User>;
  user: User;

  @Column()
  userId: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  //@Field()
  @Field({ nullable: true })
  @DeleteDateColumn()
  deletedAt: Date;
}
