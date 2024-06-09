import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from './boards.service';
import { providers } from 'src/_mock/providers';
import { UsersService } from 'src/users/users.service';
import { MockUserModel } from 'src/_mock/entities/user.entity';
import { mockReqPostBoard } from 'src/_mock/dtos/boards/req-post-board.dto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { MockBoardModel } from 'src/_mock/entities/board.entity';
import { emptyFile } from 'src/_mock/dtos/emptyFile';

describe('BoardsService', () => {
  let service: BoardsService;
  let usersService: UsersService;
  const { defaultUser } = MockUserModel;
  const { defaultBoard, responseBoard } = MockBoardModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: providers,
    }).compile();

    service = module.get<BoardsService>(BoardsService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('Post board', () => {
    it('RUN | getUser(id, data, image)', async () => {
      usersService.getUser = jest.fn().mockReturnValue(defaultUser);
      await service.postBoard(defaultUser.id, mockReqPostBoard, emptyFile);
      expect(usersService.getUser).toHaveBeenCalled();
    });

    it('RUN | getUser(id, data, null)', async () => {
      usersService.getUser = jest.fn().mockReturnValue(defaultUser);
      await service.postBoard(defaultUser.id, mockReqPostBoard, null);
      expect(usersService.getUser).toHaveBeenCalled();
    });
  });

  describe('Get boards', () => {
    it('RUN | getBoards', async () => {
      await service.getBoards(1);
    });
  });

  describe('Get board', () => {
    it('RUN | getBoard', async () => {
      await service.getBoard(defaultBoard.id);
    });

    it('ERR | Board not found', async () => {
      const result = service.getBoard(0);
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('Edit board', () => {
    it('USE | getBoard', async () => {
      service.getBoard = jest.fn().mockReturnValue(responseBoard);
      await service.editBoard(
        defaultBoard.id,
        mockReqPostBoard,
        emptyFile,
        defaultUser.id,
      );
      expect(service.getBoard).toHaveBeenCalled();
    });

    it('RUN | editBoard', async () => {
      await service.editBoard(
        defaultBoard.id,
        mockReqPostBoard,
        null,
        defaultUser.id,
      );
    });

    it('ERR | You are not allowed to edit this board', async () => {
      service.getBoard = jest.fn().mockReturnValue(responseBoard);
      const result = service.editBoard(
        defaultBoard.id,
        mockReqPostBoard,
        emptyFile,
        0,
      );
      expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('Delete board', () => {
    it('USE | getBoard', async () => {
      service.getBoard = jest.fn().mockReturnValue(responseBoard);
      await service.deleteBoard(defaultBoard.id, defaultUser.id);
      expect(service.getBoard).toHaveBeenCalled();
    });

    it('ERR | You are not allowed to delete this board', async () => {
      const result = service.deleteBoard(defaultBoard.id, 0);
      expect(result).rejects.toThrow(UnauthorizedException);
    });
  });
});
