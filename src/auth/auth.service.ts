import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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

  async validateUser(
    loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string }> {
    const { email, password } = loginUserDto;
    const user = await this.usersService.findOne(email);
    if (!user || (user && !(await bcrypt.compare(password, user.password)))) {
      throw new ForbiddenException(
        '올바르지 않은 이메일 또는 비밀번호 입니다.',
      );
    }

    try {
      const loginedAt = new Date();
      await this.usersService.updateLoginedAt(email, loginedAt);
      return await this.login(user);
    } catch (error) {
      throw new InternalServerErrorException(
        '로그인 과정에서 에러가 발생했습니다.',
      );
    }
  }

  async login(user): Promise<{ access_token: string }> {
    const payload = { user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(user): Promise<void> {
    await this.usersService.updateLoginedAt(user.email, null);
  }
}
