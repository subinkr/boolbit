import { ApiProperty } from '@nestjs/swagger';

export class ReqPatchUserNickname {
  @ApiProperty({ example: 'newNickname' })
  nickname: string;
}
