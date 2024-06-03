import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from './base.entity';
import { Entity, JoinTable, ManyToMany } from 'typeorm';
import { UserModel } from './user.entity';
import { MockSkillModel } from 'src/_mock/entities/skill.entity';

@Entity()
export class SkillModel extends BaseModel {
  @ApiProperty({ example: MockSkillModel.defaultSkill.name })
  name: string;

  @ApiProperty({ example: MockSkillModel.defaultSkill.point })
  point: number;

  @ApiProperty({ example: [], required: false })
  @ManyToMany(() => UserModel, (user) => user.skillList)
  @JoinTable({ name: 'skill_user_model' })
  userList: Promise<UserModel[]>;
}
