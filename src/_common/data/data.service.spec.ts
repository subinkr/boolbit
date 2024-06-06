import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from './data.service';
import { providers } from 'src/_mock/providers';

describe('DataService', () => {
  let service: DataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: providers,
    }).compile();

    service = module.get<DataService>(DataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
