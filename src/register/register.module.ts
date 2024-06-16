import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/_core/entities/user.entity';
import { AuthService } from 'src/_common/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserDetailModel } from 'src/_core/entities/user-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, UserDetailModel])],
  controllers: [RegisterController],
  providers: [RegisterService, AuthService, JwtService],
})
export class RegisterModule {}
