import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from './base.entity';
import { JoinTable, ManyToMany } from 'typeorm';
import { UserModel } from './user.entity';
import { MockActivityModel } from 'src/_mock/entities/activity.entity';

export class ActivityModel extends BaseModel {
  @ApiProperty({ example: MockActivityModel.defaultActivity.name })
  name: string;

  @ApiProperty({ example: MockActivityModel.defaultActivity.value })
  value: number;

  @ApiProperty({ example: MockActivityModel.defaultActivity.unit })
  unit: string;

  @ApiProperty({ example: [], required: false })
  @ManyToMany(() => UserModel, (user) => user.activityList)
  @JoinTable({ name: 'activity_user_model' })
  userList: Promise<UserModel[]>;
}
