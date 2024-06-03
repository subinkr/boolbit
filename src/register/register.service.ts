import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/_common/auth/auth.service';
import { UserModel } from 'src/_core/entities/user.entity';
import { Repository } from 'typeorm';
import { ReqLocalRegister } from './dto/req-local-register.dto';
import { ResRegister } from './dto/res-register.dto';
import { ResWithdrawRegister } from './dto/res-withdraw-register.dto';
import { UserDetailModel } from 'src/_core/entities/user-detail.entity';
import { ActivityModel } from 'src/_core/entities/activity.entity';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(UserDetailModel)
    private readonly userDetailRepository: Repository<UserDetailModel>,
    private readonly authService: AuthService,
  ) {}
  async localRegister(
    reqLocalRegister: ReqLocalRegister,
  ): Promise<ResRegister> {
    const { username, password } = reqLocalRegister;
    const existUser = await this.userRepository.exists({
      where: { username: username },
    });
    if (existUser) {
      throw new ConflictException('User already registered');
    }

    const hashPassword = await this.authService.hashPassword(password);

    const detail = await this.userDetailRepository.save({});
    const user = this.userRepository.create({
      ...reqLocalRegister,
      password: hashPassword,
    });
    user.detail = Promise.resolve(detail);
    this.userRepository.save(user);

    const accessToken = this.authService.signToken(user.id);

    return { accessToken };
  }

  async withdrawRegister(id: number): Promise<ResWithdrawRegister> {
    await this.userRepository.softDelete(id);

    return { message: 'You have withdrawn your registration' };
  }
}
