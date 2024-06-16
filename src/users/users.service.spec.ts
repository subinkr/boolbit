import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { providers } from 'src/_mock/providers';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { MockUserModel } from 'src/_mock/entities/user.entity';
import { emptyFile } from 'src/_mock/dtos/emptyFile';
import { mockReqPatchUserNickname } from 'src/_mock/dtos/users/req-patch-user-nickname.dto';

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

  describe('Patch user image', () => {
    it('USE | getUser', async () => {
      service.getUser = jest.fn().mockReturnValue(defaultUser);
      await service.patchUserImage(defaultUser.id, defaultUser.id, emptyFile);
      expect(service.getUser).toHaveBeenCalled();
    });

    it('RUN | patchUserImage', async () => {
      await service.patchUserImage(defaultUser.id, defaultUser.id, null);
    });

    it('ERR | Cannot patch other users image', async () => {
      const result = service.patchUserImage(defaultUser.id, 0, emptyFile);
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('Patch user nickname', () => {
    it('USE | getUser', async () => {
      service.getUser = jest.fn().mockReturnValue(defaultUser);
      await service.patchUserNickname(
        defaultUser.id,
        defaultUser.id,
        mockReqPatchUserNickname,
      );
      expect(service.getUser).toHaveBeenCalled();
    });

    it('ERR | Cannot patch other users nickname', async () => {
      const result = service.patchUserNickname(
        defaultUser.id,
        0,
        mockReqPatchUserNickname,
      );
      await expect(result).rejects.toThrow(UnauthorizedException);
    });
  });
});
