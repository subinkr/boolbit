import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { MockUserModel } from 'src/_mock/entities/user.entity';

export class ReqLocalRegister {
  @ApiProperty({ example: MockUserModel.defaultUser.username })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  username: string;

  @ApiProperty({ example: 'p@ssw0rd' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: MockUserModel.defaultUser.nickname })
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiProperty({ example: MockUserModel.defaultUser.image, required: false })
  @IsString()
  image?: string;
}
