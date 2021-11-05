import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth-guard/jwt-auth.guard';
import { LocalAuthGuard } from './auth-guard/local-auth.guard';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@GetUser() user) {
    await this.authService.logout(user);
    return {
      message: '정상적으로 로그아웃 되었습니다.',
    };
  }
}
