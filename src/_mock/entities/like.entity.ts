import { LikeModel } from 'src/_core/entities/like.entity';

export class MockLikeModel {
  static defaultLike: LikeModel = {
    id: 1,
    createdAt: new Date(1),
    updatedAt: new Date(1),
    deletedAt: null,

    board: Promise.resolve(null),
    user: Promise.resolve(null),
  };
}
