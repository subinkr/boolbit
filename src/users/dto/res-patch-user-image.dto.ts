import { ApiProperty } from '@nestjs/swagger';

export class ResPatchUserImage {
  @ApiProperty({ example: 'User image updated successfully' })
  message: string;
}
