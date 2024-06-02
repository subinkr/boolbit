import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { providers } from 'src/_mock/providers';
import { AuthService } from 'src/_common/auth/auth.service';
import { UsersService } from 'src/users/users.service';

describe('LoginService', () => {
  let service: LoginService;
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: providers,
    }).compile();

    service = module.get<LoginService>(LoginService);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('Local login', () => {
    it('USE | getUser', async () => {});

    it('USE | verifyPassword', async () => {});

    it('USE | signToken', async () => {});

    it('RES | ResLogin', async () => {});
  });
});
