import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';
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
  getMenus(): Promise<Menu[]> {
    return this.menusService.getMenus();
  }

  @Get('/:id')
  getMenuById(@Param('id') id: string): Promise<Menu> {
    return this.menusService.getMenuById(Number(id));
  }

  @Post()
  async createMenu(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
    const { category } = createMenuDto;
    const categoryFound: Category =
      await this.categoriesService.getCategoryByName(category);

    return this.menusService.createMenu(createMenuDto, categoryFound);
  }


  @Patch('/:id')
  updateMenu(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto,
  ): Promise<Menu> {
    return this.menusService.updateMenu(Number(id), updateMenuDto);
  }
  
  @Delete('/:id')
  deleteMenu(@Param('id') id: string): Promise<{ message: string }> {
    return this.menusService.deleteMenu(Number(id));
  }
}
