import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole } from './entities/user.entity';
import { UsersService } from './users.service';

const mockUserRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository() },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('유저 생성 성공', async () => {
      expect.assertions(2);
      const createUser: CreateUserDto = {
        email: 'test5555@a.com',
        password: '123',
        role: UserRole.admin,
      };
      userRepository.findOne.mockResolvedValue(undefined);
      const existUser = await service.findOne(createUser.email);
      expect(existUser).toBeUndefined();
      userRepository.save.mockResolvedValue(createUser);
      const result = await service.createUser(createUser);
      expect(result.ok).toBe(true);
    });

    it('이미 존재하는 이메일', async () => {
      const createUser = {
        email: 'test5@g.com',
        password: '123',
        role: UserRole.admin,
      };
      userRepository.findOne.mockResolvedValue({
        ...createUser,
        loginedAt: null,
        createdAt: new Date('2021-10-31'),
        updatedAt: new Date('2021-11-01'),
      });
      const result = await service.createUser(createUser);
      expect(result).toMatchObject({
        ok: false,
        htmlStatus: 409,
        error: '이미 가입한 이메일입니다.',
      });
    });
  });
});
