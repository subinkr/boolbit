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
import { SkillModel } from 'src/_core/entities/skill.entity';
import { MockSkillModel } from './entities/skill.entity';
import { LectureModel } from 'src/_core/entities/lecture.entity';
import { MockLectureModel } from './entities/lecture.entity';
import { BoardModel } from 'src/_core/entities/board.entity';
import { MockBoardModel } from './entities/board.entity';
import { CommentModel } from 'src/_core/entities/comment.entity';
import { MockCommentModel } from './entities/comment.entity';
import { LikeModel } from 'src/_core/entities/like.entity';
import { MockLikeModel } from './entities/like.entity';
import { NotificationModel } from 'src/_core/entities/notification.entity';
import { MockNotificationModel } from './entities/notification.entity';
import { ChatModel } from 'src/_core/entities/chat.entity';
import { MockChatModel } from './entities/chat.entity';
import { RoomModel } from 'src/_core/entities/room.entity';
import { MockRoomModel } from './entities/room.entity';
import { BoardsService } from 'src/boards/boards.service';
import { DataService } from 'src/_common/data/data.service';

export const providers = [
  JwtService,
  AuthService,
  RegisterService,
  UsersService,
  LoginService,
  BoardsService,
  DataService,
  {
    provide: getRepositoryToken(UserModel),
    useClass: MockUserModel,
  },
  {
    provide: getRepositoryToken(UserDetailModel),
    useClass: MockUserDetailModel,
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
  {
    provide: getRepositoryToken(ChatModel),
    useClass: MockChatModel,
  },
  {
    provide: getRepositoryToken(RoomModel),
    useClass: MockRoomModel,
  },
  {
    provide: getRepositoryToken(NotificationModel),
    useClass: MockNotificationModel,
  },
  {
    provide: getRepositoryToken(BoardModel),
    useClass: MockBoardModel,
  },
  {
    provide: getRepositoryToken(CommentModel),
    useClass: MockCommentModel,
  },
  {
    provide: getRepositoryToken(LikeModel),
    useClass: MockLikeModel,
  },
];
