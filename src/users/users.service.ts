import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/_core/entities/user.entity';
import { Repository } from 'typeorm';
import { ResGetUser } from './dto/res-get-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  async getUser(data: number | string): Promise<ResGetUser> {
    const dataIsNumber = typeof data === 'number';

    const user = await this.userRepository.findOne({
      where: {
        id: dataIsNumber ? data : null,
        username: !dataIsNumber ? data : null,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      image: user.image,
    };
  }
}
