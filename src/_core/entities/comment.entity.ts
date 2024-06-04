import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from './user.entity';
import { MockCommentModel } from 'src/_mock/entities/comment.entity';
import { BoardModel } from './board.entity';

@Entity()
export class CommentModel extends BaseModel {
  @ApiProperty({ example: MockCommentModel.defaultComment.content })
  @Column()
  content: string;

  @ApiProperty({ example: MockCommentModel.defaultComment.board })
  @ManyToOne(() => BoardModel, (board) => board.commentList, {
    onDelete: 'CASCADE',
  })
  board: Promise<BoardModel>;

  @ApiProperty({ example: MockCommentModel.defaultComment.user })
  @ManyToOne(() => UserModel, (user) => user.boardList, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user: UserModel;
}
