import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { MockUserModel } from 'src/_mock/entities/user.entity';

export class ReqLocalLogin {
  @ApiProperty({ example: MockUserModel.defaultUser.username })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'p@ssw0rd' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
