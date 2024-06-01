import { ApiProperty } from '@nestjs/swagger';
import { MockUserModel } from 'src/_mock/entities/user.entity';

export class ResRegister {
  @ApiProperty({ example: MockUserModel.accessToken })
  accessToken: string;
}
