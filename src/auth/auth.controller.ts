import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth-guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
