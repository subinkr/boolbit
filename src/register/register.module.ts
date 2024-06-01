import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/_core/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/_common/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel]), UsersModule, AuthModule],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
