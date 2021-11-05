import { Body, Controller, Post } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu } from './entities/menu.entity';
import { MenusService } from './menus.service';

@Controller('menus')
export class MenusController {
  constructor(
    private menusService: MenusService,
    private categoriesService: CategoriesService,
  ) {}

  @Post()
  async createMenu(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
    const { category } = createMenuDto;
    const categoryFound: Category =
      await this.categoriesService.getCategoryByName(category);

    return this.menusService.createMenu(createMenuDto, categoryFound);
  }
}
