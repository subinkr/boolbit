import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModel } from 'src/_core/entities/board.entity';
import { UsersService } from 'src/users/users.service';
import { UserModel } from 'src/_core/entities/user.entity';
import { AuthService } from 'src/_common/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([BoardModel, UserModel])],
  controllers: [BoardsController],
  providers: [BoardsService, UsersService, AuthService, JwtService],
})
export class BoardsModule {}
