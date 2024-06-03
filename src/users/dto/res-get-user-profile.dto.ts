import { ApiProperty } from '@nestjs/swagger';
import { MockUserModel } from 'src/_mock/entities/user.entity';

export class ResGetUserProfile {
  @ApiProperty({ example: MockUserModel.defaultUser.id })
  id: number;

  @ApiProperty({ example: MockUserModel.defaultUser.username })
  username: string;

  @ApiProperty({ example: MockUserModel.defaultUser.nickname })
  nickname: string;

  @ApiProperty({ example: MockUserModel.defaultUser.image, required: false })
  image: string;

  @ApiProperty({
    example: MockUserModel.defaultUser.titleName,
    required: false,
  })
  titleName: string;

  @ApiProperty({
    example: MockUserModel.defaultUser.titleColor,
    required: false,
  })
  titleColor: string;
}
