import { ActivityModel } from 'src/_core/entities/activity.entity';

export class MockActivityModel {
  static defaultActivity: ActivityModel = {
    id: 1,
    createdAt: new Date(1),
    updatedAt: new Date(1),
    deletedAt: null,

    name: 'walk',
    value: 0,
    unit: 'km',

    userList: Promise.resolve(null),
  };
}
