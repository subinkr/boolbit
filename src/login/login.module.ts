import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/_common/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/_core/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { DataService } from 'src/_common/data/data.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [LoginController],
  providers: [LoginService, UsersService, DataService, AuthService, JwtService],
})
export class LoginModule {}
