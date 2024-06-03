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
import { UserDetailModel } from 'src/_core/entities/user-detail.entity';
import { MockUserDetailModel } from './entities/user-detail.entity';
import { ActivityModel } from 'src/_core/entities/activity.entity';
import { MockActivityModel } from './entities/activity.entity';
import { SkillModel } from 'src/_core/entities/skill.entity';
import { MockSkillModel } from './entities/skill.entity';
import { LectureModel } from 'src/_core/entities/lecture.entity';
import { MockLectureModel } from './entities/lecture.entity';

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
    provide: getRepositoryToken(UserDetailModel),
    useClass: MockUserDetailModel,
  },
  {
    provide: getRepositoryToken(ActivityModel),
    useClass: MockActivityModel,
  },
  {
    provide: getRepositoryToken(SkillModel),
    useClass: MockSkillModel,
  },
  {
    provide: getRepositoryToken(LectureModel),
    useClass: MockLectureModel,
  },
  {
    provide: getRepositoryToken(TitleModel),
    useClass: MockTitleModel,
  },
];
