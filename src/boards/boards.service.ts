import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardModel } from 'src/_core/entities/board.entity';
import { Repository } from 'typeorm';
import { ReqPostBoard } from './dto/req-post-board.dto';
import { UsersService } from 'src/users/users.service';
import { DataService } from 'src/_common/data/data.service';
import { ResPostBoard } from './dto/res-post-board.dto';
import { ResGetBoards } from './dto/res-get-boards.dto';
import { ReqPatchBoard } from './dto/req-patch-board';

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
    const take = 10;
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

  async patchBoard(
    id: number,
    reqPatchBoard: ReqPatchBoard,
    file: Express.Multer.File,
    userId: number,
  ) {
    const board = await this.getBoard(id);

    if (board.user.id !== userId) {
      throw new UnauthorizedException('Cannot patch this board');
    }

    const image = file ? await this.dataService.uploadImage(file) : board.image;

    await this.boardRepository.save({ id, ...reqPatchBoard, image });

    return { message: 'Board updated successfully' };
  }

  async deleteBoard(id: number, userId: number) {
    const board = await this.getBoard(id);

    if (board.user.id !== userId) {
      throw new UnauthorizedException('Cannot delete this board');
    }

    await this.boardRepository.softDelete(board.id);

    return { message: 'Board deleted successfully' };
  }
}
