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
import { GetUser } from '../auth/get-user.decorator';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/entities/category.entity';
import { User } from '../users/entities/user.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { RelationMenuTagDto } from './dto/relation-menu-tag.dto';
import { Menu } from './entities/menu.entity';
import { MenusService } from './menus.service';
import { TagsService } from 'src/tags/tags.service';
import { Tag } from 'src/tags/entities/tag.entity';
import { JwtAuthGuard } from 'src/auth/auth-guard/jwt-auth.guard';

@Controller('menus')
export class MenusController {
  constructor(
    private menusService: MenusService,
    private categoriesService: CategoriesService,
    private tagsService: TagsService,
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateMenu(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto,
    @GetUser() user: User,
  ): Promise<Menu> {
    this.menusService.checkAdmin(user);
    return this.menusService.updateMenu(Number(id), updateMenuDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteMenu(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    this.menusService.checkAdmin(user);
    return this.menusService.deleteMenu(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/tag')
  async relationMenuTag(
    @Param('id') id: string,
    @Body() relationMenuTagDto: RelationMenuTagDto,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    this.menusService.checkAdmin(user);
    const tags: Tag[] = [];
    for (const el of relationMenuTagDto.tags) {
      tags.push(await this.tagsService.getTagById(el));
    }
    return this.menusService.relationMenuTag(Number(id), tags);
  }
}
