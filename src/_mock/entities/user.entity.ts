import { UserModel } from 'src/_core/entities/user.entity';

export class MockUserModel {
  static defaultUser: UserModel = {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,

    username: 'username',
    password: 'password',
    nickname: 'nickname',
    image: null,
  };
}
