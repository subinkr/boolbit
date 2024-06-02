import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from 'src/_common/auth/auth.service';
import { UserModel } from 'src/_core/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { MockUserModel } from './entities/user.entity';
import { RegisterService } from 'src/register/register.service';

export const providers = [
  JwtService,
  AuthService,
  RegisterService,
  UsersService,
  {
    provide: getRepositoryToken(UserModel),
    useClass: MockUserModel,
  },
];
