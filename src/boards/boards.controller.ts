import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ReqPostBoard } from './dto/req-post-board.dto';
import { AuthId } from 'src/_common/auth/auth.decorator';
import { AuthGuard } from 'src/_common/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { BoardModel } from 'src/_core/entities/board.entity';
import { ResPostBoard } from './dto/res-post-board.dto';
import { ResGetBoards } from './dto/res-get-boards.dto';
import { ResGetBoard } from './dto/res-get-board.dto';
import { ReqPatchBoard } from './dto/req-patch-board';
import { ResPatchBoard } from './dto/res-patch-board.dto';
import { unauthorized } from 'src/_core/error/unauthorized';
import { ResDeleteBoard } from './dto/res-delete-board';

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

  @Get()
  @ApiOperation({ summary: 'Get boards' })
  @ApiOkResponse({ type: ResGetBoards })
  async getBoards(@Query('page', ParseIntPipe) page?: number) {
    return this.boardsService.getBoards(page ?? 1);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get board' })
  @ApiOkResponse({ type: ResGetBoard })
  async getBoard(@Param('id') id: number): Promise<BoardModel> {
    return this.boardsService.getBoard(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Patch board' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        content: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({ type: ResPatchBoard })
  @ApiUnauthorizedResponse(unauthorized('Cannot patch this board'))
  @ApiBearerAuth()
  async patchBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() reqPatchBoard: ReqPatchBoard,
    @UploadedFile() file: Express.Multer.File,
    @AuthId() userId: number,
  ) {
    return this.boardsService.patchBoard(id, reqPatchBoard, file, userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete board' })
  @ApiOkResponse({ type: ResDeleteBoard })
  @ApiUnauthorizedResponse(unauthorized('Cannot delete this board'))
  @ApiBearerAuth()
  async deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @AuthId() userId: number,
  ) {
    return this.boardsService.deleteBoard(id, userId);
  }
}
