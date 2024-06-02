import { Test, TestingModule } from '@nestjs/testing';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { mockReqLocalRegister } from 'src/_mock/dtos/register/req-local-register.dto';
import { providers } from 'src/_mock/providers';
import { MockUserModel } from 'src/_mock/entities/user.entity';

describe('RegisterController', () => {
  let controller: RegisterController;
  let service: RegisterService;
  const { defaultUser } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: providers,
    }).compile();

    controller = module.get<RegisterController>(RegisterController);
    service = module.get<RegisterService>(RegisterService);
  });

  describe('Local registration', () => {
    it('USE | localRegister', async () => {
      service.localRegister = jest.fn();
      await controller.localRegister(mockReqLocalRegister);
      expect(service.localRegister).toHaveBeenCalled();
    });
  });

  describe('Withdraw registration', () => {
    it('USE | withdrawRegister', async () => {
      service.withdrawRegister = jest.fn();
      await controller.withdrawRegister(defaultUser.id);
      expect(service.withdrawRegister).toHaveBeenCalled();
    });
  });
});
