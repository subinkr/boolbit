import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModel } from './_core/entities/user.entity';
import { CommonModule } from './_common/_common.module';
import { UsersModule } from './users/users.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TitleModel } from './_core/entities/title.entity';
import { UserDetailModel } from './_core/entities/user-detail.entity';
import { SkillModel } from './_core/entities/skill.entity';
import { LectureModel } from './_core/entities/lecture.entity';
import { BoardModel } from './_core/entities/board.entity';
import { CommentModel } from './_core/entities/comment.entity';
import { LikeModel } from './_core/entities/like.entity';
import { NotificationModel } from './_core/entities/notification.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOSTNAME,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        UserModel,
        UserDetailModel,
        SkillModel,
        LectureModel,
        TitleModel,
        NotificationModel,
        BoardModel,
        CommentModel,
        LikeModel,
      ],
      synchronize: true,
    }),
    CommonModule,
    UsersModule,
    RegisterModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
