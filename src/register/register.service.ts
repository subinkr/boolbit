import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/_common/auth/auth.service';
import { UserModel } from 'src/_core/entities/user.entity';
import { Repository } from 'typeorm';
import { ReqLocalRegister } from './dto/req-local-register.dto';
import { ResRegister } from './dto/res-register.dto';
import { ResWithdrawRegister } from './dto/res-withdraw-register.dto';
import { UserDetailModel } from 'src/_core/entities/user-detail.entity';

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
    user.titleList = Promise.resolve([]);
    user.followerUserList = Promise.resolve([]);
    user.followerUserList = Promise.resolve([]);

    user.skillList = Promise.resolve([]);
    user.lectureList = Promise.resolve([]);

    user.chatList = Promise.resolve([]);
    user.roomList = Promise.resolve([]);
    user.notificationList = Promise.resolve([]);

    user.boardList = Promise.resolve([]);
    user.commentList = Promise.resolve([]);
    user.likeList = Promise.resolve([]);

    user.detail = Promise.resolve(detail);

    const { id, image } = await this.userRepository.save(user);

    const accessToken = this.authService.signToken(user.id);

    return { accessToken, id, image };
  }

  async withdrawRegister(id: number): Promise<ResWithdrawRegister> {
    await this.userRepository.softDelete(id);

    return { message: 'You have withdrawn your registration' };
  }
}
