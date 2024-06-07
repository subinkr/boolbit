import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from './data.service';
import { providers } from 'src/_mock/providers';
import { emptyFile } from 'src/_mock/dtos/emptyFile';
import { BoardModel } from 'src/_core/entities/board.entity';
import { MockBoardModel } from 'src/_mock/entities/board.entity';

describe('DataService', () => {
  let service: DataService;
  const { boardList } = MockBoardModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: providers,
    }).compile();

    service = module.get<DataService>(DataService);
  });

  describe('Upload image', () => {
    it('RUN | uploadImage', async () => {
      await service.uploadImage(emptyFile);
    });
  });

  describe('Pagination', () => {
    it('RUN | pagination', () => {
      const findAndCount: [BoardModel[], number] = [
        boardList,
        boardList.length,
      ];
      const take = 3;
      const result = service.pagination(findAndCount, take);
      const { array, totalPages } = result;

      expect(array).toStrictEqual(findAndCount[0]);
      expect(totalPages).toEqual(
        Math.floor((findAndCount[1] && findAndCount[1] - 1) / take) + 1,
      );
    });
  });
});
