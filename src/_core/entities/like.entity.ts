import { Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './base.entity';
import { UserModel } from './user.entity';
import { BoardModel } from './board.entity';

@Entity()
export class LikeModel extends BaseModel {
  @ManyToOne(() => BoardModel, (board) => board.likeList)
  board: Promise<BoardModel>;

  @ManyToOne(() => UserModel, (user) => user.likeList)
  user: Promise<UserModel>;
}
