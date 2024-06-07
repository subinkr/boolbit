import { ApiProperty } from '@nestjs/swagger';

export class ResPostBoard {
  @ApiProperty({ example: 1 })
  id: number;
}
