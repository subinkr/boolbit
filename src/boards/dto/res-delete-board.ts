import { ApiProperty } from '@nestjs/swagger';

export class ResDeleteBoard {
  @ApiProperty({ example: 'Board deleted successfully' })
  message: string;
}
