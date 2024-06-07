import { Injectable } from '@nestjs/common';
import { ResPagination } from './dto/res-pagination.dto';

@Injectable()
export class DataService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    return `${process.env.HOST}/public/image/${file.filename}`;
  }

  pagination<T>(findAndCount: [T[], number], take: number): ResPagination<T> {
    const array = findAndCount[0];
    const totalPages =
      Math.floor((findAndCount[1] && findAndCount[1] - 1) / take) + 1;

    return { array, totalPages };
  }
}
