import { Column, Entity, OneToOne } from 'typeorm';
import { UserModel } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MockUserDetailModel } from 'src/_mock/entities/user-detail.entity';
import { BaseModel } from './base.entity';

@Entity()
export class UserDetailModel extends BaseModel {
  @OneToOne(() => UserModel, (user) => user.detail)
  user: Promise<UserModel>;

  @ApiProperty({
    example: MockUserDetailModel.defaultDetail.titleColor,
  })
  @Column({ default: '0xFFFFFFFF' })
  titleColor: string;

  @ApiProperty({
    example: MockUserDetailModel.defaultDetail.strengthLevel,
  })
  @Column({ default: 1 })
  strengthLevel: number;
  @ApiProperty({
    example: MockUserDetailModel.defaultDetail.agilityLevel,
  })
  @Column({ default: 1 })
  agilityLevel: number;
  @ApiProperty({
    example: MockUserDetailModel.defaultDetail.staminaLevel,
  })
  @Column({ default: 1 })
  staminaLevel: number;
  @ApiProperty({
    example: MockUserDetailModel.defaultDetail.intellectLevel,
  })
  @Column({ default: 1 })
  intellectLevel: number;
  @ApiProperty({
    example: MockUserDetailModel.defaultDetail.wisdomLevel,
  })
  @Column({ default: 1 })
  wisdomLevel: number;

  @ApiProperty({
    example: MockUserDetailModel.defaultDetail.strengthExp,
  })
  @Column({ default: 0 })
  strengthExp: number;
  @ApiProperty({
    example: MockUserDetailModel.defaultDetail.agilityExp,
  })
  @Column({ default: 0 })
  agilityExp: number;
  @ApiProperty({
    example: MockUserDetailModel.defaultDetail.staminaExp,
  })
  @Column({ default: 0 })
  staminaExp: number;
  @ApiProperty({
    example: MockUserDetailModel.defaultDetail.intellectExp,
  })
  @Column({ default: 0 })
  intellectExp: number;
  @ApiProperty({
    example: MockUserDetailModel.defaultDetail.wisdomExp,
  })
  @Column({ default: 0 })
  wisdomExp: number;

  @ApiProperty({
    example: MockUserDetailModel.defaultDetail.followUsers,
  })
  @Column({ default: 0 })
  followUsers: number;

  @ApiProperty({
    example: MockUserDetailModel.defaultDetail.followingUsers,
  })
  @Column({ default: 0 })
  followingUsers: number;

  @ApiProperty({
    example: MockUserDetailModel.defaultDetail.skills,
  })
  @Column({ default: 0 })
  skills: number;

  @ApiProperty({
    example: MockUserDetailModel.defaultDetail.lectures,
  })
  @Column({ default: 0 })
  lectures: number;

  @ApiProperty({
    example: MockUserDetailModel.defaultDetail.steps,
  })
  @Column({ default: 0 })
  steps: number;

  @ApiProperty({
    example: MockUserDetailModel.defaultDetail.active_energy_burned,
  })
  @Column({ default: 0 })
  active_energy_burned: number;

  @ApiProperty({
    example: MockUserDetailModel.defaultDetail.water,
  })
  @Column({ default: 0 })
  water: number;
}
