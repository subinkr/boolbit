import { ApiProperty } from '@nestjs/swagger';

export class ResEditBoard {
  @ApiProperty({ example: 'Board updated successfully' })
  message: string;
}
