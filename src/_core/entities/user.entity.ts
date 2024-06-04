import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseModel } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MockUserModel } from 'src/_mock/entities/user.entity';
import { Exclude } from 'class-transformer';
import { TitleModel } from './title.entity';
import { UserDetailModel } from './user-detail.entity';
import { SkillModel } from './skill.entity';
import { LectureModel } from './lecture.entity';
import { BoardModel } from './board.entity';
import { CommentModel } from './comment.entity';
import { LikeModel } from './like.entity';

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

  @ApiProperty({ example: [] })
  @ManyToMany(() => TitleModel, (title) => title.userList, {
    onDelete: 'SET NULL',
  })
  titleList: Promise<TitleModel[]>;

  @ApiProperty({ example: [] })
  @ManyToMany(() => UserModel, (user) => user.followingUserList, {
    onDelete: 'CASCADE',
  })
  followerUserList: Promise<UserModel[]>;

  @ApiProperty({ example: [] })
  @ManyToMany(() => UserModel, (user) => user.followerUserList)
  @JoinTable({ name: 'follow_model' })
  followingUserList: Promise<UserModel[]>;

  @ApiProperty({ example: [] })
  @ManyToMany(() => SkillModel, (skill) => skill.userList, {
    onDelete: 'SET NULL',
  })
  skillList: Promise<SkillModel[]>;

  @ApiProperty({ example: [] })
  @ManyToMany(() => LectureModel, (lecture) => lecture.userList, {
    onDelete: 'SET NULL',
  })
  lectureList: Promise<LectureModel[]>;

  // chatList;
  // roomList;
  // notificationList;

  @ApiProperty({ example: [] })
  @OneToMany(() => BoardModel, (board) => board.user)
  boardList: Promise<BoardModel[]>;

  @ApiProperty({ example: [] })
  @OneToMany(() => CommentModel, (comment) => comment.user)
  commentList: Promise<CommentModel[]>;

  @ApiProperty({ example: [] })
  @OneToMany(() => LikeModel, (like) => like.user)
  likeList: Promise<LikeModel[]>;

  @ApiProperty({ example: MockUserModel.defaultUser.detail })
  @OneToOne(() => UserDetailModel, (detail) => detail.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_detail' })
  detail: Promise<UserDetailModel>;
}
