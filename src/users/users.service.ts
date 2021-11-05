import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

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

  async findOneByPassword({ email, password }: LoginUserDto): Promise<{
    ok: boolean;
    data?: { email: string };
    htmlStatus?: number;
    error?: string;
  }> {
    try {
      const user = await this.usersRepository.findOne({ email });
      if (!user || (user && !(await bcrypt.compare(password, user.password)))) {
        return {
          ok: false,
          htmlStatus: 403,
          error: '올바르지 않은 이메일 또는 비밀번호 입니다.',
        };
      }
      return { ok: true, data: { email: user.email } };
    } catch (error) {
      return {
        ok: false,
        htmlStatus: 500,
        error: '유저 조회에 에러가 발생했습니다.',
      };
    }
  }
}
