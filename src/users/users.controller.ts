import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createBody: CreateUserDto) {
    const result = await this.usersService.createUser(createBody);
    if (result.ok) {
      return;
    } else {
      throw new HttpException(result.error, result.htmlStatus);
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const result = await this.usersService.findOneByPassword(loginUserDto);
    if (result.ok) {
      return result;
    } else {
      throw new HttpException(result.error, result.htmlStatus);
    }
  }
}
