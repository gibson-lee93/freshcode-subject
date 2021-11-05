import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
      return { ok: true, data: { email: user.email } };
    } catch (error) {
      return {
        ok: false,
        htmlStatus: 500,
        error: '로그인 과정에서 에러가 발생했습니다.',
      };
    }
  }
}
