import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReqPostBoard {
  @ApiProperty({ example: 'title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'content' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: '#5km #오운완' })
  tags?: string;
}
