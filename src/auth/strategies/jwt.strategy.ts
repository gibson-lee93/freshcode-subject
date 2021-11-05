import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const { email, role, loginedAt } = payload.user.data;
    const user = await this.usersService.findOne(email);
    const tokenLoginedAt = new Date(loginedAt).getTime();
    const userLoginedAt = new Date(user.loginedAt).getTime();
    if (tokenLoginedAt !== userLoginedAt) {
      throw new UnauthorizedException('올바르지 않은 토큰입니다');
    }
    return { email, role, loginedAt };
  }
}
