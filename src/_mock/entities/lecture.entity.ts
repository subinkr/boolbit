import { LectureModel } from 'src/_core/entities/lecture.entity';

export class MockLectureModel {
  static defaultLecture: LectureModel = {
    id: 1,
    createdAt: new Date(1),
    updatedAt: new Date(1),
    deletedAt: null,

    name: '코드팩토리 Flutter 초급',
    hour: 36,

    userList: Promise.resolve(null),
  };
}
