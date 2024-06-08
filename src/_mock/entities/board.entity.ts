import { BoardModel } from 'src/_core/entities/board.entity';
import { MockUserModel } from './user.entity';

export class MockBoardModel {
  static defaultBoard: BoardModel = {
    id: 1,
    createdAt: new Date(1),
    updatedAt: new Date(1),
    deletedAt: null,

    title: 'title',
    image: null,
    content: 'content',
    comments: 0,
    likes: 0,
    commentList: Promise.resolve([]),
    likeList: Promise.resolve([]),

    user: MockUserModel.defaultUser,
  };

  static responseBoard = {
    id: 1,
    title: 'title',
    image: null,
    content: 'content',
    comments: 0,
    likes: 0,
    user: {
      id: 1,
      username: 'username',
      nickname: 'nickname',
      image: null,
      titleName: null,
    },
  };

  static boardList: BoardModel[] = [this.defaultBoard];

  create() {
    return MockBoardModel.defaultBoard;
  }

  findOne({ where: { id } }) {
    const [board] = MockBoardModel.boardList.filter((board) => board.id === id);

    if (!board) return null;

    return board;
  }

  findAndCount() {
    return [[MockBoardModel.defaultBoard], 1];
  }

  save() {
    return MockBoardModel.defaultBoard;
  }
}
