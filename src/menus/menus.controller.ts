import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from '../categories/entities/category.entity';
import { User } from '../users/entities/user.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { MenusService } from './menus.service';

@Controller('menus')
export class MenusController {
  constructor(
    private menusService: MenusService,
    private categoriesService: CategoriesService,
  ) {}

  @Get()
  getMenus(@Query('page') page: string): Promise<Menu[]> {
    const limit = 5;
    const offset = page ? (Number(page) - 1) * limit : 0;
    return this.menusService.getMenus(limit, offset);
  }

  @Get('/:id')
  getMenuById(@Param('id') id: string): Promise<Menu> {
    return this.menusService.getMenuById(Number(id));
  }

  @UseGuards(AuthGuard())
  @Post()
  async createMenu(
    @Body() createMenuDto: CreateMenuDto,
    @GetUser() user: User,
  ): Promise<Menu> {
    this.menusService.checkAdmin(user);
    const { category } = createMenuDto;
    const categoryFound: Category =
      await this.categoriesService.getCategoryByName(category);

    return this.menusService.createMenu(createMenuDto, categoryFound);
  }

  @UseGuards(AuthGuard())
  @Patch('/:id')
  updateMenu(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto,
    @GetUser() user: User,
  ): Promise<Menu> {
    this.menusService.checkAdmin(user);
    return this.menusService.updateMenu(Number(id), updateMenuDto);
  }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  deleteMenu(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    this.menusService.checkAdmin(user);
    return this.menusService.deleteMenu(Number(id));
  }
}
