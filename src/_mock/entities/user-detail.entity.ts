import { UserDetailModel } from 'src/_core/entities/user-detail.entity';

export class MockUserDetailModel {
  static defaultDetail: UserDetailModel = {
    id: 1,
    createdAt: new Date(1),
    updatedAt: new Date(1),
    deletedAt: null,

    user: Promise.resolve(null),

    titleColor: '0xFFFFFFFF',

    strengthLevel: 1,
    agilityLevel: 1,
    staminaLevel: 1,
    intellectLevel: 1,
    wisdomLevel: 1,

    strengthExp: 0,
    agilityExp: 0,
    staminaExp: 0,
    intellectExp: 0,
    wisdomExp: 0,

    followUsers: 0,
    followingUsers: 0,
    skills: 0,
    lectures: 0,
  };

  static detailList = [this.defaultDetail];

  save() {
    MockUserDetailModel.detailList.push(MockUserDetailModel.defaultDetail);

    return MockUserDetailModel.defaultDetail;
  }
}
