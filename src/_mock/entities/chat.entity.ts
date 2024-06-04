import { MockRoomModel } from './room.entity';
import { MockUserModel } from './user.entity';
import { ChatModel } from 'src/_core/entities/chat.entity';

export class MockChatModel {
  static defaultChat: ChatModel = {
    id: 1,
    createdAt: new Date(1),
    updatedAt: new Date(1),
    deletedAt: null,

    content: 'content',
    room: MockRoomModel.defaultRoom,
    user: MockUserModel.defaultUser,
  };
}
