import { EntityRepository, Repository } from 'typeorm';
import { Menu } from 'src/menus/entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { InternalServerErrorException } from '@nestjs/common';

import { Category } from 'src/categories/entities/category.entity';
@EntityRepository(Menu)
export class MenusRepository extends Repository<Menu> {
  async createMenu(
    createMenuDto: CreateMenuDto,
    category: Category,
  ): Promise<Menu> {
    const { name, description, isSold, badge } = createMenuDto;

    const menu: Menu = this.create({
      name,
      description,
      isSold,
      badge,
      category,
    });

    try {
      await this.save(menu);
      return menu;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
