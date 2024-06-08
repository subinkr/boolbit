import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ReqPostBoard } from './dto/req-post-board.dto';
import { AuthId } from 'src/_common/auth/auth.decorator';
import { AuthGuard } from 'src/_common/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { BoardModel } from 'src/_core/entities/board.entity';
import { ResPostBoard } from './dto/res-post-board.dto';
import { ResGetBoards } from './dto/res-get-boards.dto';
import { ResGetBoard } from './dto/res-get-board.dto';

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
        tags: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiCreatedResponse({ type: ResPostBoard })
  @ApiBearerAuth()
  async postBoard(
    @AuthId() id: number,
    @Body() reqPostBoard: ReqPostBoard,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResPostBoard> {
    return this.boardsService.postBoard(id, reqPostBoard, file);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get board' })
  @ApiOkResponse({ type: ResGetBoard })
  async getBoard(@Param('id') id: number): Promise<BoardModel> {
    return this.boardsService.getBoard(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get boards' })
  @ApiOkResponse({ type: ResGetBoards })
  async getBoards(@Query('page', ParseIntPipe) page: number) {
    return this.boardsService.getBoards(page);
  }
}
