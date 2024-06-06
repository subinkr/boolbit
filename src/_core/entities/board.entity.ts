import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { UserModel } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MockBoardModel } from 'src/_mock/entities/board.entity';
import { CommentModel } from './comment.entity';
import { LikeModel } from './like.entity';

@Entity()
export class BoardModel extends BaseModel {
  @ApiProperty({ example: MockBoardModel.defaultBoard.title })
  @Column()
  title: string;

  @ApiProperty({ example: MockBoardModel.defaultBoard.image })
  @Column({ nullable: true })
  image?: string;

  @ApiProperty({ example: MockBoardModel.defaultBoard.content })
  @Column()
  content: string;

  @ApiProperty({ example: MockBoardModel.defaultBoard.comments })
  @Column({ default: 0 })
  comments: number;

  @ApiProperty({ example: MockBoardModel.defaultBoard.likes })
  @Column({ default: 0 })
  likes: number;

  @ApiProperty({ example: [] })
  @OneToMany(() => CommentModel, (comment) => comment.board)
  commentList: Promise<CommentModel[]>;

  @ApiProperty({ example: [] })
  @OneToMany(() => LikeModel, (like) => like.user)
  likeList: Promise<LikeModel[]>;

  @ApiProperty({ example: MockBoardModel.defaultBoard.user })
  @ManyToOne(() => UserModel, (user) => user.boardList, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user: UserModel;
}
