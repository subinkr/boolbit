import { Test, TestingModule } from '@nestjs/testing';
import { RegisterService } from './register.service';
import { providers } from 'src/_mock/providers';
import { mockReqLocalRegister } from 'src/_mock/dtos/register/req-local-register.dto';
import { ConflictException } from '@nestjs/common';
import { MockUserModel } from 'src/_mock/entities/user.entity';
import { AuthService } from 'src/_common/auth/auth.service';

describe('RegisterService', () => {
  let service: RegisterService;
  let authService: AuthService;
  const { defaultUser } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: providers,
    }).compile();

    service = module.get<RegisterService>(RegisterService);
    authService = module.get<AuthService>(AuthService);
  });

  describe('Local registration', () => {
    it('ERR | User already registered', async () => {
      const result = service.localRegister({
        ...mockReqLocalRegister,
        username: defaultUser.username,
      });
      await expect(result).rejects.toThrow(ConflictException);
    });

    it('USE | hashPassword', async () => {
      authService.hashPassword = jest
        .fn()
        .mockReturnValue(defaultUser.password);
      await service.localRegister(mockReqLocalRegister);
      expect(authService.hashPassword).toHaveBeenCalled();
    });
  });

  describe('Withdraw registration', () => {
    it('RUN', async () => {
      await service.withdrawRegister(defaultUser.id);
    });
  });
});
