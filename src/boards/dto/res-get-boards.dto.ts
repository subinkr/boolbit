import { ApiProperty } from '@nestjs/swagger';
import { BoardModel } from 'src/_core/entities/board.entity';
import { MockBoardModel } from 'src/_mock/entities/board.entity';

export class ResGetBoards {
  @ApiProperty({ example: [MockBoardModel.responseBoard] })
  boards: BoardModel[];

  @ApiProperty({ example: 1 })
  totalPages: number;
}
