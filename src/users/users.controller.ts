import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { notFound } from 'src/_core/error/not-found';
import { ResGetUserProfile } from './dto/res-get-user-profile.dto';

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
}
