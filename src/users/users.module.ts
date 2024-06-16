import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/_core/entities/user.entity';
import { DataService } from 'src/_common/data/data.service';
import { AuthService } from 'src/_common/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UsersController],
  providers: [UsersService, DataService, AuthService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
