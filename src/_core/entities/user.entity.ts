import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MockUserModel } from 'src/_mock/entities/user.entity';
import { Exclude } from 'class-transformer';
import { TitleModel } from './title.entity';

@Entity()
export class UserModel extends BaseModel {
  @ApiProperty({ example: MockUserModel.defaultUser.username, required: false })
  @Column()
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiProperty({ example: MockUserModel.defaultUser.nickname, required: false })
  @Column({ default: 'Anonymous' })
  nickname: string;

  @ApiProperty({ example: MockUserModel.defaultUser.image, required: false })
  @Column({ nullable: true })
  image?: string;

  @ApiProperty({
    example: MockUserModel.defaultUser.titleName,
    required: false,
  })
  @Column({ nullable: true })
  titleName?: string;

  @ApiProperty({
    example: MockUserModel.defaultUser.titleColor,
    required: false,
  })
  @Column({ nullable: true })
  titleColor?: string;

  @ApiProperty({
    example: MockUserModel.defaultUser.titleList,
    required: false,
  })
  @ManyToMany(() => TitleModel, (title) => title.userList)
  titleList: Promise<TitleModel[]>;

  // strengthLevel;
  // agilityLevel;
  // staminaLevel;
  // intellectLevel;
  // wisdomLevel;
  // strengthExp;
  // agilityExp;
  // staminaExp;
  // intellectExp;
  // wisdomExp;

  // followUserList;
  // followingUserList;
  // followUsers;
  // followingUsers;

  // achievementList;
  // logList;

  // activityList;
  // skillList;
  // lectureList;
  // skills;
  // lectures;

  // chatList;
  // roomList;

  // notificationList;
  // notifications;
}
