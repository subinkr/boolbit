import { Column, Entity } from 'typeorm';
import { BaseModel } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MockUserModel } from 'src/_mock/entities/user.entity';

@Entity()
export class UserModel extends BaseModel {
  @ApiProperty({ example: MockUserModel.defaultUser.username, required: false })
  @Column()
  username: string;

  @ApiProperty({ example: MockUserModel.defaultUser.password, required: false })
  @Column()
  password: string;

  @ApiProperty({ example: MockUserModel.defaultUser.nickname, required: false })
  @Column()
  nickname: string;

  @ApiProperty({ example: MockUserModel.defaultUser.image, required: false })
  @Column({ nullable: true })
  image?: string;

  // title;

  // strength;
  // agility;
  // stamina;
  // intelligence;
  // wisdom;

  // titles;
  // followUsers;
  // followingUsers;

  // achievements;
  // boards;
  // tags;
  // comments;
  // likes;

  // activities;
  // skills;
  // lectures;

  // logs;

  // chats;
  // rooms;
}
