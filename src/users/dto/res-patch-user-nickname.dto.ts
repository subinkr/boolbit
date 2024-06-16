import { ApiProperty } from '@nestjs/swagger';

export class ResPatchUserNickname {
  @ApiProperty({ example: 'User nickname updated successfully' })
  message: string;
}
