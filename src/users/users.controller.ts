import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResGetUser } from './dto/res-get-user.dto';
import { notFound } from 'src/_core/error/not-found';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiOkResponse({ type: ResGetUser })
  @ApiNotFoundResponse(notFound('User not found'))
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<ResGetUser> {
    return this.usersService.getUser(id);
  }
}
