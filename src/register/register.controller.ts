import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { RegisterService } from './register.service';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResRegister } from './dto/res-register.dto';
import { conflict } from 'src/_core/error/conflict';
import { ReqLocalRegister } from './dto/req-local-register.dto';
import { ResWithdrawRegister } from './dto/res-withdraw-register.dto';
import { AuthId } from 'src/_common/auth/auth.decorator';
import { AuthGuard } from 'src/_common/auth/auth.guard';

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

  @Delete('withdraw')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Withdraw registration' })
  @ApiNoContentResponse({ type: ResWithdrawRegister })
  @ApiBearerAuth()
  async withdrawRegister(@AuthId() id: number): Promise<ResWithdrawRegister> {
    return this.registerService.withdrawRegister(id);
  }
}
