import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { BaseModel } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MockUserModel } from 'src/_mock/entities/user.entity';
import { Exclude } from 'class-transformer';
import { TitleModel } from './title.entity';
import { UserDetailModel } from './user-detail.entity';

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
    example: MockUserModel.defaultUser.titleList,
    required: false,
  })
  @ManyToMany(() => TitleModel, (title) => title.userList)
  titleList: Promise<TitleModel[]>;

  @ApiProperty({ example: [], required: false })
  @ManyToMany(() => UserModel, (user) => user.followingUserList, {
    onDelete: 'CASCADE',
  })
  followerUserList: Promise<UserModel[]>;

  @ApiProperty({ example: [], required: false })
  @ManyToMany(() => UserModel, (user) => user.followerUserList)
  @JoinTable({ name: 'follow_model' })
  followingUserList: Promise<UserModel[]>;

  // activityList;
  // skillList;
  // lectureList;
  // chatList;
  // roomList;
  // notificationList;

  // boardList;
  // commentList;
  // likeList;

  @ApiProperty({ example: MockUserModel.defaultUser.detail })
  @OneToOne(() => UserDetailModel, (detail) => detail.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_detail' })
  detail: Promise<UserDetailModel>;
}
