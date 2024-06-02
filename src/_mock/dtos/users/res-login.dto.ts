import { MockUserModel } from 'src/_mock/entities/user.entity';
import { ResLogin } from 'src/login/dto/res-login.dto';

const { defaultUser, accessToken } = MockUserModel;

export const mockResLogin: ResLogin = {
  accessToken,
  id: defaultUser.id,
  nickname: defaultUser.nickname,
  image: defaultUser.image,
};
