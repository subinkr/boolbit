import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { providers } from 'src/_mock/providers';
import { NotFoundException } from '@nestjs/common';
import { MockUserModel } from 'src/_mock/entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  const { defaultUser } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: providers,
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('Get user', () => {
    it('RUN | getUser(id)', async () => {
      await service.getUser(defaultUser.id);
    });

    it('RUN | getUser(username)', async () => {
      await service.getUser(defaultUser.username);
    });

    it('ERR | User not found', async () => {
      const result = service.getUser(0);
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });

  describe('Get user profile', () => {
    it('USE | getUser', async () => {
      service.getUser = jest.fn().mockReturnValue(defaultUser);
      await service.getUserProfile(defaultUser.id);
      expect(service.getUser).toHaveBeenCalled();
    });
  });
});
