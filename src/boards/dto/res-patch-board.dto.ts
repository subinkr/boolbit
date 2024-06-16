import { ApiProperty } from '@nestjs/swagger';

export class ResPatchBoard {
  @ApiProperty({ example: 'Board updated successfully' })
  message: string;
}
