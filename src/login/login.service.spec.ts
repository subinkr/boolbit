import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { providers } from 'src/_mock/providers';
import { AuthService } from 'src/_common/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { MockUserModel } from 'src/_mock/entities/user.entity';
import { mockReqLocalLogin } from 'src/_mock/dtos/login/req-local-login.dto';
import { mockResLogin } from 'src/_mock/dtos/login/res-login.dto';

describe('LoginService', () => {
  let service: LoginService;
  let authService: AuthService;
  let usersService: UsersService;
  const { defaultUser, accessToken } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: providers,
    }).compile();

    service = module.get<LoginService>(LoginService);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('Local login', () => {
    it('USE | getUser', async () => {
      usersService.getUser = jest.fn().mockReturnValue(defaultUser);
      await service.localLogin(mockReqLocalLogin);
      expect(usersService.getUser).toHaveBeenCalled();
    });

    it('USE | verifyPassword', async () => {
      authService.verifyPassword = jest.fn().mockReturnValue(true);
      await service.localLogin(mockReqLocalLogin);
      expect(authService.verifyPassword).toHaveBeenCalled();
    });

    it('USE | signToken', async () => {
      authService.signToken = jest.fn().mockReturnValue(accessToken);
      await service.localLogin(mockReqLocalLogin);
      expect(authService.signToken).toHaveBeenCalled();
    });

    it('RES | ResLogin', async () => {
      const result = await service.localLogin(mockReqLocalLogin);
      const keys = Object.keys(result);
      const required = Object.keys(mockResLogin);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });
});
