import { BoardModel } from 'src/_core/entities/board.entity';
import { MockUserModel } from './user.entity';
import { Entity } from 'typeorm';

export class MockBoardModel {
  static defaultBoard: BoardModel = {
    id: 1,
    createdAt: new Date(1),
    updatedAt: new Date(1),
    deletedAt: null,

    title: 'title',
    content: 'content',
    user: MockUserModel.defaultUser,
  };
}
