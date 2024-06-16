import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { providers } from 'src/_mock/providers';
import { MockUserModel } from 'src/_mock/entities/user.entity';
import { emptyFile } from 'src/_mock/dtos/emptyFile';
import { mockReqPatchUserNickname } from 'src/_mock/dtos/users/req-patch-user-nickname.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  const { defaultUser } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: providers,
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('Get user profile', () => {
    it('USE | getUserProfile', async () => {
      service.getUserProfile = jest.fn().mockReturnValue(defaultUser);
      await controller.getUserProfile(defaultUser.id);
      expect(service.getUserProfile).toHaveBeenCalled();
    });
  });

  describe('Patch user image', () => {
    it('USE | patchUserImage', async () => {
      service.patchUserImage = jest.fn().mockReturnValue(defaultUser);
      await controller.patchUserImage(
        defaultUser.id,
        emptyFile,
        defaultUser.id,
      );
      expect(service.patchUserImage).toHaveBeenCalled();
    });
  });

  describe('Patch user Nickname', () => {
    it('USE | patchUserNickname', async () => {
      service.patchUserNickname = jest.fn().mockReturnValue(defaultUser);
      await controller.patchUserNickname(
        defaultUser.id,
        mockReqPatchUserNickname,
        defaultUser.id,
      );
      expect(service.patchUserNickname).toHaveBeenCalled();
    });
  });
});
