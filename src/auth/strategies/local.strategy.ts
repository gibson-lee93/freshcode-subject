import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email, password) {
    const loginUserDto = { email, password };
    const result = await this.authService.validateUser(loginUserDto);
    if (result.ok) {
      return {
        ok: true,
        data: { email: result.data.email, role: result.data.role },
      };
    } else {
      throw new HttpException(result.error, result.htmlStatus);
    }
  }
}
