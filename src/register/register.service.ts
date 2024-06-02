import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/_common/auth/auth.service';
import { UserModel } from 'src/_core/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { ReqLocalRegister } from './dto/req-local-register.dto';
import { ResRegister } from './dto/res-register.dto';
import { ResWithdrawRegister } from './dto/res-withdraw-register.dto';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    private readonly usersService: UsersService,
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

    const user = await this.userRepository.save({
      ...reqLocalRegister,
      password: hashPassword,
    });
    const accessToken = this.authService.signToken(user.id);

    return { accessToken };
  }

  async withdrawRegister(id: number): Promise<ResWithdrawRegister> {
    await this.userRepository.softDelete(id);

    return { message: 'You have withdrawn your registration' };
  }
}
