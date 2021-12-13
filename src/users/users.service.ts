import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const { email, password, role } = createUserDto;
    const existUser = await this.findOne(email);
    if (existUser) {
      throw new ConflictException('이미 가입한 이메일입니다.');
    }

    try {
      const user = this.usersRepository.create({ email, password, role });
      await this.usersRepository.save(user);
      return { message: '회원가입이 완료되었습니다.' };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException('유저 정보가 존재하지 않습니다.');
    }
    return user;
  }

  async updateLoginedAt(email: string, loginedAt: Date): Promise<void> {
    const user = await this.findOne(email);
    user.loginedAt = loginedAt;
    await this.usersRepository.save(user);
  }
}
