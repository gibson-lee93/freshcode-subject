import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { UserRole } from '../users/entities/user.entity';

jest.mock('../users/users.service');

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        { provide: JwtService, useValue: { sign: jest.fn(() => 'TOKEN') } },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect.assertions(3);
    expect(authService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('validateUser', () => {
    let result;
    const query: { email: string; password: string } = {
      email: 'test@g.com',
      password: '123',
    };
    beforeEach(() => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue({
        ...query,
        id: 1,
        role: UserRole.admin,
        createdAt: new Date('2021-10-31'),
        updatedAt: new Date('2021-11-01'),
        loginedAt: null,
        deletedAt: null,
        hashPassword: jest.fn(),
      });
    });
    it('유효성 검사: 성공', async () => {
      expect.assertions(3);
      const bcryptCompare = jest.fn().mockResolvedValue(true);
      (bcrypt.compare as jest.Mock) = bcryptCompare;
      result = await authService.validateUser(query);
      expect(result.ok).toBe(true);
      expect(result.data.email).toBe(query.email);
      expect(result.data.role).toBe(UserRole.admin);
    });

    it('유효성 검사: 비밀번호 불일치', async () => {
      expect.assertions(3);
      const bcryptCompare = jest.fn().mockResolvedValue(false);
      (bcrypt.compare as jest.Mock) = bcryptCompare;
      result = await authService.validateUser(query);
      expect(result.ok).toBe(false);
      expect(result.htmlStatus).toBe(403);
      expect(result.error).toBe('올바르지 않은 이메일 또는 비밀번호 입니다.');
    });
  });

  describe('login', () => {
    it('로그인: 성공', async () => {
      const user = { email: 'test@g.com' };
      jest.spyOn(jwtService, 'sign').mockReturnValue('TOKEN');
      const result = await authService.login(user);
      expect(result).toMatchObject({ access_token: 'TOKEN' });
    });
  });
});
