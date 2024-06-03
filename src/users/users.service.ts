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
    const user = await this.getUser(data);
    const detail = await user.detail;

    return {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      image: user.image,
      titleName: user.titleName,
      titleColor: detail.titleColor,

      strengthLevel: detail.strengthLevel,
      agilityLevel: detail.agilityLevel,
      staminaLevel: detail.staminaLevel,
      intellectLevel: detail.intellectLevel,
      wisdomLevel: detail.wisdomLevel,

      strengthExp: detail.strengthExp,
      agilityExp: detail.agilityExp,
      staminaExp: detail.staminaExp,
      intellectExp: detail.intellectExp,
      wisdomExp: detail.wisdomExp,

      followUsers: detail.followUsers,
      followingUsers: detail.followingUsers,
      skills: detail.skills,
      lectures: detail.lectures,

      activityList: await user.activityList,
      skillList: await user.skillList,
      lectureList: await user.lectureList,
    };
  }
}
