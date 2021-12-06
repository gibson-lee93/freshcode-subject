import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth-guard/jwt-auth.guard';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('logout')
  async logout(@GetUser() user) {
    await this.authService.logout(user);
    return {
      message: '정상적으로 로그아웃 되었습니다.',
    };
  }
}
