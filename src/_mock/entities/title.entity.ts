import { TitleModel } from 'src/_core/entities/title.entity';

export class MockTitleModel {
  static defaultTitle: TitleModel = {
    id: 1,
    createdAt: new Date(1),
    updatedAt: new Date(1),
    deletedAt: null,

    name: 'title',
    color: '0xFF789789',
    userList: Promise.resolve([]),
  };

  static titleList = [this.defaultTitle];

  findOne({ where: { name } }) {
    const [title] = MockTitleModel.titleList.filter(
      (title) => title.name === name,
    );

    if (!title) return null;

    return title;
  }

  findAndCount() {
    return MockTitleModel.titleList;
  }

  exists({ where: { name } }) {
    const [title] = MockTitleModel.titleList.filter(
      (title) => title.name === name,
    );

    if (title) return true;

    return false;
  }

  save() {
    MockTitleModel.titleList.push(MockTitleModel.defaultTitle);

    return MockTitleModel.defaultTitle;
  }

  update() {}

  softDelete() {
    return true;
  }
}
