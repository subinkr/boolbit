import { Test, TestingModule } from '@nestjs/testing';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { providers } from 'src/_mock/providers';
import { MockBoardModel } from 'src/_mock/entities/board.entity';
import { mockReqPostBoard } from 'src/_mock/dtos/boards/req-post-board.dto';
import { MockUserModel } from 'src/_mock/entities/user.entity';
import { emptyFile } from 'src/_mock/dtos/emptyFile';

describe('BoardsController', () => {
  let controller: BoardsController;
  let service: BoardsService;
  const { defaultUser } = MockUserModel;
  const { responseBoard } = MockBoardModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: providers,
    }).compile();

    controller = module.get<BoardsController>(BoardsController);
    service = module.get<BoardsService>(BoardsService);
  });

  describe('Post board', () => {
    it('USE | postBoard', async () => {
      service.postBoard = jest.fn().mockReturnValue(responseBoard.id);
      await controller.postBoard(defaultUser.id, mockReqPostBoard, emptyFile);
      expect(service.postBoard).toHaveBeenCalled();
    });
  });

  describe('Get boards', () => {
    it('USE | getBoards', async () => {
      service.getBoards = jest.fn().mockReturnValue([[responseBoard], 1]);
      await controller.getBoards();
      expect(service.getBoards).toHaveBeenCalled();
    });
  });

  describe('Get board', () => {
    it('USE | getBoard', async () => {
      service.getBoard = jest.fn().mockReturnValue(responseBoard);
      await controller.getBoard(defaultUser.id);
      expect(service.getBoard).toHaveBeenCalled();
    });
  });

  describe('Patch board', () => {
    it('USE | patchBoard', async () => {
      service.patchBoard = jest.fn();
      await controller.patchBoard(
        defaultUser.id,
        mockReqPostBoard,
        emptyFile,
        defaultUser.id,
      );
      expect(service.patchBoard).toHaveBeenCalled();
    });
  });

  describe('Delete board', () => {
    it('USE | deleteBoard', async () => {
      service.deleteBoard = jest.fn();
      await controller.deleteBoard(defaultUser.id, defaultUser.id);
      expect(service.deleteBoard).toHaveBeenCalled();
    });
  });
});
