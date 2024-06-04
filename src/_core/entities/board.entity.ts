import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './base.entity';
import { UserModel } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MockUserModel } from 'src/_mock/entities/user.entity';
import { MockBoardModel } from 'src/_mock/entities/board.entity';

@Entity()
export class BoardModel extends BaseModel {
  @ApiProperty({ example: MockBoardModel.defaultBoard.title })
  @Column()
  title: string;

  @ApiProperty({ example: MockBoardModel.defaultBoard.content })
  @Column()
  content: string;

  @ApiProperty({ example: MockUserModel.defaultUser })
  @ManyToOne(() => UserModel, (user) => user.boardList, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user: UserModel;
}
