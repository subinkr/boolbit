import { MockUserModel } from './user.entity';
import { CommentModel } from 'src/_core/entities/comment.entity';

export class MockCommentModel {
  static defaultComment: CommentModel = {
    id: 1,
    createdAt: new Date(1),
    updatedAt: new Date(1),
    deletedAt: null,

    content: 'content',

    board: Promise.resolve(null),
    user: MockUserModel.defaultUser,
  };
}
