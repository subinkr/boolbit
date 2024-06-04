import { ApiProperty } from '@nestjs/swagger';
import { MockUserModel } from 'src/_mock/entities/user.entity';

export class ResLogin {
  @ApiProperty({ example: MockUserModel.accessToken })
  accessToken: string;

  @ApiProperty({ example: MockUserModel.defaultUser.id })
  id: number;

  @ApiProperty({ example: MockUserModel.defaultUser.image })
  image?: string;
}
