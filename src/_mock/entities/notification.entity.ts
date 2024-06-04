import { NotificationModel } from 'src/_core/entities/notification.entity';
import { MockUserModel } from './user.entity';

export class MockNotificationModel {
  static defaultNotification: NotificationModel = {
    id: 1,
    createdAt: new Date(1),
    updatedAt: new Date(1),
    deletedAt: null,

    title: 'title',
    content: 'content',
    fromUserId: 1,

    user: MockUserModel.defaultUser,
  };
}
