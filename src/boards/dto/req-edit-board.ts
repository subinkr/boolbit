import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReqEditBoard {
  @ApiProperty({ example: 'title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'content' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
