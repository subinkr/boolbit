import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { providers } from 'src/_mock/providers';
import { mockResLogin } from 'src/_mock/dtos/users/res-login.dto';
import { mockReqLocalLogin } from 'src/_mock/dtos/users/req-local-login.dto';

describe('LoginController', () => {
  let controller: LoginController;
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: providers,
    }).compile();

    controller = module.get<LoginController>(LoginController);
    service = module.get<LoginService>(LoginService);
  });

  describe('Local login', () => {
    it('USE | localLogin', async () => {
      service.localLogin = jest.fn().mockReturnValue(mockResLogin);
      await controller.localLogin(mockReqLocalLogin);
      expect(service.localLogin).toHaveBeenCalled();
    });
  });
});
