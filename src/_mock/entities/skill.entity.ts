import { SkillModel } from 'src/_core/entities/skill.entity';

export class MockSkillModel {
  static defaultSkill: SkillModel = {
    id: 1,
    createdAt: new Date(1),
    updatedAt: new Date(1),
    deletedAt: null,

    name: '리눅스 마스터 2급',
    point: 1,

    userList: Promise.resolve(null),
  };
}
