import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from 'src/_common/auth/auth.service';
import { UserModel } from 'src/_core/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { MockUserModel } from './entities/user.entity';
import { RegisterService } from 'src/register/register.service';
import { LoginService } from 'src/login/login.service';
import { TitleModel } from 'src/_core/entities/title.entity';
import { MockTitleModel } from './entities/title.entity';

export const providers = [
  JwtService,
  AuthService,
  RegisterService,
  UsersService,
  LoginService,
  {
    provide: getRepositoryToken(UserModel),
    useClass: MockUserModel,
  },
  {
    provide: getRepositoryToken(TitleModel),
    useClass: MockTitleModel,
  },
];
