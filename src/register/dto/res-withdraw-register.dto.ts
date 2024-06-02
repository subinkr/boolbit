import { ApiProperty } from '@nestjs/swagger';

export class ResWithdrawRegister {
  @ApiProperty({ example: 'You have withdrawn your registration' })
  message: string;
}
