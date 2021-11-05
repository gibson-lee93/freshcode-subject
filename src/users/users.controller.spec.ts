import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

jest.mock('./users.service');

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('회원가입 성공', async () => {
    const createUser = {
      email: 'test@g.com',
      password: '123',
      role: UserRole.admin,
    };
    jest.spyOn(service, 'createUser').mockResolvedValue({
      ok: true,
    });

    const result = await controller.createUser(createUser);
    expect(result.message).toBe('회원가입에 성공하였습니다.');
  });

  it('회원가입 실패: 이미 존재하는 이메일', async () => {
    expect.assertions(3);
    const createUser = {
      email: 'test@g.com',
      password: '123',
      role: UserRole.admin,
    };
    jest.spyOn(service, 'createUser').mockResolvedValue({
      ok: false,
      htmlStatus: 409,
      error: '이미 가입한 이메일입니다.',
    });
    try {
      await controller.createUser(createUser);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(409);
      expect(error.message).toBe('이미 가입한 이메일입니다.');
    }
  });
});
