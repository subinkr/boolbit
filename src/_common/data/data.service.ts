import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    return `${process.env.HOST}/public/image/${file.filename}`;
  }
}
