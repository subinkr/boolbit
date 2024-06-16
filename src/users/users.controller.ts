import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { notFound } from 'src/_core/error/not-found';
import { ResGetUserProfile } from './dto/res-get-user-profile.dto';
import { ResPatchUserImage } from './dto/res-patch-user-image.dto';
import { unauthorized } from 'src/_core/error/unauthorized';
import { AuthGuard } from 'src/_common/auth/auth.guard';
import { AuthId } from 'src/_common/auth/auth.decorator';
import { ResPatchUserNickname } from './dto/res-patch-user-nickname.dto';
import { ReqPatchUserNickname } from './dto/req-patch-user-nickname';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiOkResponse({ type: ResGetUserProfile })
  @ApiNotFoundResponse(notFound('User not found'))
  async getUserProfile(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResGetUserProfile> {
    return this.usersService.getUserProfile(id);
  }

  @Patch(':id/image')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Patch users image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({ type: ResPatchUserImage })
  @ApiUnauthorizedResponse(unauthorized('Cannot patch other users image'))
  @ApiBearerAuth()
  async patchUserImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @AuthId() userId: number,
  ) {
    return this.usersService.patchUserImage(id, userId, file);
  }

  @Patch(':id/nickname')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Patch users nickname' })
  @ApiOkResponse({ type: ResPatchUserNickname })
  @ApiUnauthorizedResponse(unauthorized('Cannot patch other users nickname'))
  @ApiBearerAuth()
  async patchUserNickname(
    @Param('id', ParseIntPipe) id: number,
    @Body() reqPatchUserNickname: ReqPatchUserNickname,
    @AuthId() userId: number,
  ) {
    return this.usersService.patchUserNickname(
      id,
      userId,
      reqPatchUserNickname,
    );
  }
}
