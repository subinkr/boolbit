import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/_common/auth/auth.service';
import { UserModel } from 'src/_core/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { ReqLocalRegister } from './dto/req-local-register.dto';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  async localRegister(reqLocalRegister: ReqLocalRegister): Promise<string> {
    const { username, password } = reqLocalRegister;
    const existUser = await this.usersService.getUser(username);
    if (existUser) {
      throw new ConflictException('User already registered');
    }

    const hashPassword = await this.authService.hashPassword(password);

    const user = await this.userRepository.save({
      ...reqLocalRegister,
      password: hashPassword,
    });
    const accessToken = this.authService.signToken(user.id);

    return accessToken;
  }
}
