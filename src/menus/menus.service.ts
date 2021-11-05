import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu } from './entities/menu.entity';
import { MenusRepository } from './menus.repository';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(MenusRepository)
    private menusRepository: MenusRepository,
  ) {}

  createMenu(createMenuDto: CreateMenuDto, category: Category): Promise<Menu> {
    return this.menusRepository.createMenu(createMenuDto, category);
  }
}
