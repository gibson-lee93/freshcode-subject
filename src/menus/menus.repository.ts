import { EntityRepository, Repository } from 'typeorm';
import { Menu } from '../menus/entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { Category } from '../categories/entities/category.entity';

@EntityRepository(Menu)
export class MenusRepository extends Repository<Menu> {
  async createMenu(
    createMenuDto: CreateMenuDto,
    category: Category,
  ): Promise<Menu> {
    const menu: Menu = this.create({
      ...createMenuDto,
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
