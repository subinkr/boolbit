import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { providers } from 'src/_mock/providers';
import { JwtService } from '@nestjs/jwt';
import { MockUserModel } from 'src/_mock/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  const { defaultUser, accessToken } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: providers,
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('Sign token', () => {
    it('USE | sign', () => {
      jwtService.sign = jest.fn().mockReturnValue(accessToken);
      service.signToken(defaultUser.id);
      expect(jwtService.sign).toHaveBeenCalled();
    });
  });

  describe('Verify token', () => {
    it('USE | verify', () => {
      jwtService.verify = jest.fn().mockReturnValue(true);
      service.verifyToken(`Bearer ${accessToken}`);
      expect(jwtService.verify).toHaveBeenCalled;
    });
  });

  describe('Hash password', () => {
    it('RES | hashPassword: string', async () => {
      const hashPassword = await service.hashPassword('p@ssw0rd');
      const verify = await bcrypt.compare('p@ssw0rd', hashPassword);
      expect(verify).toBeTruthy();
    });
  });

  describe('Verify password', () => {
    it('RES | result: boolean', async () => {
      const result = await service.verifyPassword(
        'p@ssw0rd',
        defaultUser.password,
      );
      expect(result).toBeTruthy();
    });

    it('ERR | Invalid password', async () => {
      const result = service.verifyPassword('password', defaultUser.password);
      await expect(result).rejects.toThrow(BadRequestException);
    });
  });
});
