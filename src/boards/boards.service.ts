import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardModel } from 'src/_core/entities/board.entity';
import { Repository } from 'typeorm';
import { ReqPostBoard } from './dto/req-post-board.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardModel)
    private readonly boardRepository: Repository<BoardModel>,
    private readonly usersService: UsersService,
  ) {}

  async postBoard(
    userId: number,
    reqPostBoard: ReqPostBoard,
    file: Express.Multer.File,
  ) {
    const user = await this.usersService.getUser(userId);
    const board = this.boardRepository.create();
    board.commentList = Promise.resolve([]);
    board.likeList = Promise.resolve([]);
    const newBoard = await this.boardRepository.save({ ...reqPostBoard, user });

    return newBoard.id;
  }

  async getBoards() {}

  async getBoard(id: number) {
    const board = await this.boardRepository.findOne({ where: { id } });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    return board;
  }
}