import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from 'src/_core/entities/user.entity';
import { MockBoardModel } from 'src/_mock/entities/board.entity';

export class ResGetBoard {
  @ApiProperty({ example: MockBoardModel.responseBoard.id })
  id: number;

  @ApiProperty({ example: MockBoardModel.responseBoard.title })
  title: string;

  @ApiProperty({ example: MockBoardModel.responseBoard.image })
  image: string;

  @ApiProperty({ example: MockBoardModel.responseBoard.content })
  content: string;

  @ApiProperty({ example: MockBoardModel.responseBoard.comments })
  comments: number;

  @ApiProperty({ example: MockBoardModel.responseBoard.likes })
  likes: number;

  @ApiProperty({ example: MockBoardModel.responseBoard.user })
  user: UserModel;
}
