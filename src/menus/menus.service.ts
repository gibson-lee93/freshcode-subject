import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { Tag } from '../tags/entities/tag.entity';
import { User } from '../users/entities/user.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { MenusRepository } from './menus.repository';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(MenusRepository)
    private menusRepository: MenusRepository,
  ) {}

  checkAdmin(role: string) {
    if (role === 'user') {
      throw new UnauthorizedException('관리자 권한입니다.');
    }
  }

  async getMenus(limit: number, offset: number): Promise<Menu[]> {
    return await this.menusRepository.find({ skip: offset, take: limit });
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

  async updateMenu(id: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    if (Object.keys(updateMenuDto).length === 0) {
      throw new BadRequestException('요청 수정 값이 잘못되었습니다.');
    }

    try {
      await this.menusRepository.update({ id }, updateMenuDto);
      return await this.getMenuById(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteMenu(id: number): Promise<{ message: string }> {
    await this.getMenuById(id);
    try {
      await this.menusRepository.delete({ id });
      return { message: '메뉴 삭제 완료' };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async relationMenuTag(id: number, tags: Tag[]): Promise<{ message: string }> {
    const menu = await this.getMenuById(id);
    menu.tags = tags;

    try {
      await this.menusRepository.save(menu);
      return { message: '태그 추가 완료' };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
