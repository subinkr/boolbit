import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardModel } from 'src/_core/entities/board.entity';
import { Repository } from 'typeorm';
import { ReqPostBoard } from './dto/req-post-board.dto';
import { UsersService } from 'src/users/users.service';
import { DataService } from 'src/_common/data/data.service';
import { ResPostBoard } from './dto/res-post-board.dto';
import { ResGetBoards } from './dto/res-get-boards.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardModel)
    private readonly boardRepository: Repository<BoardModel>,
    private readonly usersService: UsersService,
    private readonly dataService: DataService,
  ) {}

  async postBoard(
    userId: number,
    reqPostBoard: ReqPostBoard,
    file: Express.Multer.File,
  ): Promise<ResPostBoard> {
    const user = await this.usersService.getUser(userId);

    const image = file ? await this.dataService.uploadImage(file) : null;

    const board = this.boardRepository.create();
    board.commentList = Promise.resolve([]);
    board.likeList = Promise.resolve([]);
    const newBoard = await this.boardRepository.save({
      ...reqPostBoard,
      user,
      image,
    });

    return { id: newBoard.id };
  }

  async getBoards(page: number): Promise<ResGetBoards> {
    const take = 3;
    const skip = take * (page - 1);

    const findAndCount = await this.boardRepository.findAndCount({
      order: { id: 'DESC' },
      take,
      skip,
    });

    const { array: boards, totalPages } = this.dataService.pagination(
      findAndCount,
      take,
    );

    return { boards, totalPages };
  }

  async getBoard(id: number): Promise<BoardModel> {
    const board = await this.boardRepository.findOne({ where: { id } });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    return board;
  }
}
