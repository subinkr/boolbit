import { ApiProperty } from '@nestjs/swagger';
import { LectureModel } from 'src/_core/entities/lecture.entity';
import { SkillModel } from 'src/_core/entities/skill.entity';
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

  @ApiProperty({
    example: MockUserDetailModel.defaultDetail.active_energy_burned,
  })
  active_energy_burned: number;
  @ApiProperty({
    example: MockUserDetailModel.defaultDetail.distance_walking_running,
  })
  distance_walking_running: number;
  @ApiProperty({ example: MockUserDetailModel.defaultDetail.steps })
  steps: number;

  @ApiProperty({ example: [] })
  skillList: SkillModel[];
  @ApiProperty({ example: [] })
  lectureList: LectureModel[];
}
