import { UserModel } from 'src/_core/entities/user.entity';

export class MockUserModel {
  static defaultUser: UserModel = {
    id: 1,
    createdAt: new Date(1),
    updatedAt: new Date(1),
    deletedAt: null,

    username: 'username',
    password: '$2b$10$qNKbTu/9urzFoJ1QrzoaAej7xmAq.a7Bg3tAhKdDE0p.RuVwfppO2',
    nickname: 'nickname',
    image: null,
  };

  static users: UserModel[] = [];

  static accessToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWF0IjoxNzAzNDA5OTA0LCJleHAiOjFlKzUwfQ.BBf7DDbpw-mopP6iPvu8pxc7PoTjCbt5p7h3RPWT_Cw';

  findOne({ where: { id, username } }) {
    const [user] = id
      ? MockUserModel.users.filter((user) => user.id === id)
      : MockUserModel.users.filter((user) => user.username === username);

    if (!user) return null;

    return user;
  }

  findAndCount() {
    return MockUserModel.users;
  }

  exist({ where: { id, username } }) {
    const [user] = id
      ? MockUserModel.users.filter((user) => user.id === id)
      : MockUserModel.users.filter((user) => user.username === username);

    if (user) return true;

    return false;
  }

  save() {
    MockUserModel.users.push(MockUserModel.defaultUser);

    return MockUserModel.defaultUser;
  }

  update() {}

  softDelete() {
    return true;
  }
}
