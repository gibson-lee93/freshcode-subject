import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: LoginUserDto) {
    try {
      const user = await this.usersService.findOne(email);
      if (!user || (user && !(await bcrypt.compare(password, user.password)))) {
        return {
          ok: false,
          htmlStatus: 403,
          error: '올바르지 않은 이메일 또는 비밀번호 입니다.',
        };
      }
      const loginedAt = new Date();
      await this.usersService.updateLoginedAt(email, loginedAt);
      return {
        ok: true,
        data: { email: user.email, role: user.role, loginedAt },
      };
    } catch (error) {
      return {
        ok: false,
        htmlStatus: 500,
        error: '로그인 과정에서 에러가 발생했습니다.',
      };
    }
  }

  async login(user) {
    const payload = { user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(user) {
    await this.usersService.updateLoginedAt(user.email, null);
  }
}
