import { BaseModel } from 'src/_core/entities/base.entity';

export class MockBaseModel {
  static defaultBase: BaseModel = {
    id: 1,
    createdAt: new Date(1),
    updatedAt: new Date(1),
    deletedAt: null,
  };
}
