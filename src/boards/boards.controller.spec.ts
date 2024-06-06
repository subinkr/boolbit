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
  const { defaultBoard } = MockBoardModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: providers,
    }).compile();

    controller = module.get<BoardsController>(BoardsController);
    service = module.get<BoardsService>(BoardsService);
  });

  describe('Post board', () => {
    it('USE | Post board', async () => {
      service.postBoard = jest.fn().mockReturnValue(defaultBoard.id);
      await controller.postBoard(defaultUser.id, mockReqPostBoard, emptyFile);
      expect(service.postBoard).toHaveBeenCalled();
    });
  });
});