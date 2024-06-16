import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/_core/entities/user.entity';
import { Repository } from 'typeorm';
import { ResGetUserProfile } from './dto/res-get-user-profile.dto';
import { DataService } from 'src/_common/data/data.service';
import { ResPatchUserImage } from './dto/res-patch-user-image.dto';
import { ReqPatchUserNickname } from './dto/req-patch-user-nickname';
import { ResPatchUserNickname } from './dto/res-patch-user-nickname.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    private readonly dataService: DataService,
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

      strengthExp: detail.strengthExp,
      agilityExp: detail.agilityExp,
      staminaExp: detail.staminaExp,
      intellectExp: detail.intellectExp,
      wisdomExp: detail.wisdomExp,

      followUsers: detail.followUsers,
      followingUsers: detail.followingUsers,
      skills: detail.skills,
      lectures: detail.lectures,

      active_energy_burned: detail.active_energy_burned,
      distance_walking_running: detail.distance_walking_running,
      steps: detail.steps,

      skillList: await user.skillList,
      lectureList: await user.lectureList,
    };
  }

  async patchUserImage(
    id: number,
    userId: number,
    file: Express.Multer.File,
  ): Promise<ResPatchUserImage> {
    if (id !== userId) {
      throw new UnauthorizedException('Cannot patch other users image');
    }

    const user = await this.getUser(id);

    const image = file ? await this.dataService.uploadImage(file) : user.image;

    await this.userRepository.save({ ...user, image });

    return { message: 'User image updated successfully' };
  }

  async patchUserNickname(
    id: number,
    userId: number,
    reqPatchUserNickname: ReqPatchUserNickname,
  ): Promise<ResPatchUserNickname> {
    if (id !== userId) {
      throw new UnauthorizedException('Cannot patch other users nickname');
    }

    const user = await this.getUser(id);

    await this.userRepository.save({ ...user, ...reqPatchUserNickname });

    return { message: 'User nickname updated successfully' };
  }
}
