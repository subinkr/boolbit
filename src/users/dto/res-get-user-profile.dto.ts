import { ApiProperty } from '@nestjs/swagger';
import { ActivityModel } from 'src/_core/entities/activity.entity';
import { MockUserDetailModel } from 'src/_mock/entities/user-detail.entity';
import { MockUserModel } from 'src/_mock/entities/user.entity';

export class ResGetUserProfile {
  @ApiProperty({ example: MockUserModel.defaultUser.id })
  id: number;

  @ApiProperty({ example: MockUserModel.defaultUser.username })
  username: string;

  @ApiProperty({ example: MockUserModel.defaultUser.nickname })
  nickname: string;

  @ApiProperty({ example: MockUserModel.defaultUser.image, required: false })
  image?: string;

  @ApiProperty({
    example: MockUserModel.defaultUser.titleName,
    required: false,
  })
  titleName?: string;
  @ApiProperty({ example: MockUserDetailModel.defaultDetail.titleColor })
  titleColor: string;

  @ApiProperty({ example: MockUserDetailModel.defaultDetail.strengthLevel })
  strengthLevel: number;
  @ApiProperty({ example: MockUserDetailModel.defaultDetail.agilityLevel })
  agilityLevel: number;
  @ApiProperty({ example: MockUserDetailModel.defaultDetail.staminaLevel })
  staminaLevel: number;
  @ApiProperty({ example: MockUserDetailModel.defaultDetail.intellectLevel })
  intellectLevel: number;
  @ApiProperty({ example: MockUserDetailModel.defaultDetail.wisdomLevel })
  wisdomLevel: number;

  @ApiProperty({ example: MockUserDetailModel.defaultDetail.strengthExp })
  strengthExp: number;
  @ApiProperty({ example: MockUserDetailModel.defaultDetail.agilityExp })
  agilityExp: number;
  @ApiProperty({ example: MockUserDetailModel.defaultDetail.staminaExp })
  staminaExp: number;
  @ApiProperty({ example: MockUserDetailModel.defaultDetail.intellectExp })
  intellectExp: number;
  @ApiProperty({ example: MockUserDetailModel.defaultDetail.wisdomExp })
  wisdomExp: number;

  @ApiProperty({ example: MockUserDetailModel.defaultDetail.followUsers })
  followUsers: number;
  @ApiProperty({ example: MockUserDetailModel.defaultDetail.followingUsers })
  followingUsers: number;
  @ApiProperty({ example: MockUserDetailModel.defaultDetail.skills })
  skills: number;
  @ApiProperty({ example: MockUserDetailModel.defaultDetail.lectures })
  lectures: number;

  @ApiProperty({ example: MockUserModel.defaultUser.activityList })
  activityList: ActivityModel[];
}
