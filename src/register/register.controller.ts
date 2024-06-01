import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResRegister } from './dto/res-register.dto';
import { conflict } from 'src/_core/error/conflict';
import { ReqLocalRegister } from './dto/req-local-register.dto';

@Controller('register')
@ApiTags('Register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('local')
  @ApiOperation({ summary: 'Local Registration' })
  @ApiCreatedResponse({ type: ResRegister })
  @ApiConflictResponse(conflict('User already registered'))
  async localRegister(
    @Body() reqLocalRegister: ReqLocalRegister,
  ): Promise<ResRegister> {
    return this.registerService.localRegister(reqLocalRegister);
  }
}
