import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  signToken(id: number): string {
    const accessToken = this.jwtService.sign(
      { id },
      {
        secret: process.env.JWT_SECRET || 'test',
        expiresIn: parseInt(process.env.JWT_EXPIRED) || 1234,
      },
    );

    return accessToken;
  }

  verifyToken(accessToken: string): boolean {
    const token = accessToken.split(' ')[1];
    const result = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET || 'test',
    });

    return result;
  }

  async hashPassword(password: string): Promise<string> {
    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT) || 10,
    );

    return hashPassword;
  }

  async verifyPassword(
    password: string,
    userPassword: string,
  ): Promise<boolean> {
    const result = await bcrypt.compare(password, userPassword);
    if (!result) {
      throw new BadRequestException('Invalid password');
    }

    return result;
  }
}
