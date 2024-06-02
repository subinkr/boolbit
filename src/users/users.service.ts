import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/_core/entities/user.entity';
import { Repository } from 'typeorm';
import { ResGetUserProfile } from './dto/res-get-user-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  async getUser(data: number | string): Promise<UserModel> {
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

    return user;
  }

  async getUserProfile(data: number | string): Promise<ResGetUserProfile> {
    const result = await this.getUser(data);

    return {
      id: result.id,
      username: result.username,
      nickname: result.nickname,
      image: result.image,
    };
  }
}
