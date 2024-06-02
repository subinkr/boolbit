import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResLogin } from './dto/res-login.dto';
import { notFound } from 'src/_core/error/not-found';
import { badRequest } from 'src/_core/error/bad-request';
import { ReqLocalLogin } from './dto/req-local-login.dto';

@Controller('login')
@ApiTags('Login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('local')
  @ApiOperation({ summary: 'Local login' })
  @ApiOkResponse({ type: ResLogin })
  @ApiBadRequestResponse(badRequest('Invalid password'))
  @ApiNotFoundResponse(notFound('User not found'))
  async localLogin(@Body() reqLocalLogin: ReqLocalLogin) {
    return this.loginService.localLogin(reqLocalLogin);
  }
}
