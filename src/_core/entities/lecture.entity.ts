import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from './base.entity';
import { Entity, JoinTable, ManyToMany } from 'typeorm';
import { UserModel } from './user.entity';
import { MockLectureModel } from 'src/_mock/entities/lecture.entity';

@Entity()
export class LectureModel extends BaseModel {
  @ApiProperty({ example: MockLectureModel.defaultLecture.name })
  name: string;

  @ApiProperty({ example: MockLectureModel.defaultLecture.hour })
  hour: number;

  @ApiProperty({ example: [], required: false })
  @ManyToMany(() => UserModel, (user) => user.lectureList)
  @JoinTable({ name: 'lecture_user_model' })
  userList: Promise<UserModel[]>;
}
