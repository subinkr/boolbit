import { ApiProperty } from '@nestjs/swagger';
import { MockUserModel } from 'src/_mock/entities/user.entity';

export class ResGetUser {
  @ApiProperty({ example: MockUserModel.defaultUser.id })
  id: number;
  @ApiProperty({ example: MockUserModel.defaultUser.username })
  username: string;
  @ApiProperty({ example: MockUserModel.defaultUser.nickname })
  nickname: string;
  @ApiProperty({ example: MockUserModel.defaultUser.id, required: false })
  image: string;
}
