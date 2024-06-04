import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from './user.entity';
import { MockCommentModel } from 'src/_mock/entities/comment.entity';

@Entity()
export class CommentModel extends BaseModel {
  @ApiProperty({ example: MockCommentModel.defaultComment.content })
  @Column()
  content: string;

  @ApiProperty({ example: MockCommentModel.defaultComment.user })
  @ManyToOne(() => UserModel, (user) => user.boardList, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user: UserModel;
}
