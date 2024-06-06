import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ReqPostBoard } from './dto/req-post-board.dto';
import { AuthId } from 'src/_common/auth/auth.decorator';
import { AuthGuard } from 'src/_common/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('boards')
@ApiTags('Boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Post board' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        content: { type: 'string' },
        price: { type: 'string' },
        signature: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiBearerAuth()
  async postBoard(
    @AuthId() id: number,
    @Body() reqPostBoard: ReqPostBoard,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.boardsService.postBoard(id, reqPostBoard, file);
  }
}
