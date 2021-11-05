import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getMenus(): Promise<Menu[]> {
    return await this.menusRepository.find();
  }

  async getMenuById(id: number): Promise<Menu> {
    const menu = await this.menusRepository.findOne({ id });
    if (!menu) {
      throw new NotFoundException('유효한 메뉴 id가 아닙니다.');
    }
    return menu;
  }

  createMenu(createMenuDto: CreateMenuDto, category: Category): Promise<Menu> {
    return this.menusRepository.createMenu(createMenuDto, category);
  }

  async deleteMenu(id: number): Promise<{ message: string }> {
    await this.getMenuById(id);
    await this.menusRepository.delete({ id });
    return { message: '메뉴 삭제 완료' };
  }
}
