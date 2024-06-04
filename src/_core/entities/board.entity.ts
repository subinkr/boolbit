import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { UserModel } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MockBoardModel } from 'src/_mock/entities/board.entity';
import { CommentModel } from './comment.entity';

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

  @ApiProperty({ example: [] })
  @OneToMany(() => CommentModel, (comment) => comment.user)
  commentList: Promise<CommentModel[]>;

  @ApiProperty({ example: MockBoardModel.defaultBoard.user })
  @ManyToOne(() => UserModel, (user) => user.boardList, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user: UserModel;
}
