import { Injectable } from '@nestjs/common';
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

  async createUser({ email, password, role }: CreateUserDto): Promise<{
    ok: boolean;
    htmlStatus?: number;
    error?: string;
  }> {
    try {
      // 1. email check
      const existUser = await this.usersRepository.findOne({ email });
      if (existUser) {
        return {
          ok: false,
          htmlStatus: 409,
          error: '이미 가입한 이메일입니다.',
        };
      }
      await this.usersRepository.save(
        this.usersRepository.create({ email, password, role }),
      );
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        htmlStatus: 500,
        error: '유저 생성에 에러가 발생했습니다.',
      };
    }
  }

  async findOne(email: string): Promise<User> {
    return await this.usersRepository.findOne({ email });
  }

  async updateLoginedAt(email: string, loginedAt: Date): Promise<void> {
    const user = await this.findOne(email);
    user.loginedAt = loginedAt;
    await this.usersRepository.save(user);
  }
}
