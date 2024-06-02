import { Injectable } from '@nestjs/common';
import { ReqLocalLogin } from './dto/req-local-login.dto';
import { ResLogin } from './dto/res-login.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/_common/auth/auth.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  async localLogin(reqLocalLogin: ReqLocalLogin): Promise<ResLogin> {
    const { username, password } = reqLocalLogin;

    const user = await this.usersService.getUser(username);
    await this.authService.verifyPassword(password, user.password);

    const accessToken = this.authService.signToken(user.id);

    return {
      accessToken,
      id: user.id,
      nickname: user.nickname,
      image: user.image,
    };
  }
}
