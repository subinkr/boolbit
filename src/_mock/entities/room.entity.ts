import { RoomModel } from 'src/_core/entities/room.entity';
import { MockUserModel } from './user.entity';

export class MockRoomModel {
  static defaultRoom: RoomModel = {
    id: 1,
    createdAt: new Date(1),
    updatedAt: new Date(1),
    deletedAt: null,

    name: 'name',
    lastChat: 'last chat',

    chatList: Promise.resolve([]),
    userList: [MockUserModel.defaultUser],
  };
}
