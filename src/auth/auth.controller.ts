import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth-guard/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    return this.authService.validateUser(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@GetUser() user): Promise<{ message: string }> {
    await this.authService.logout(user);
    return {
      message: '정상적으로 로그아웃 되었습니다.',
    };
  }
}
