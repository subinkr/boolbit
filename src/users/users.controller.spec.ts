import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { providers } from 'src/_mock/providers';
import { MockUserModel } from 'src/_mock/entities/user.entity';

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

  describe('Get user', () => {
    it('USE | getUser', async () => {
      service.getUser = jest.fn().mockReturnValue(defaultUser);
      await controller.getUser(defaultUser.id);
      expect(service.getUser).toHaveBeenCalled();
    });
  });
});
