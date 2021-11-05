import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Menu } from 'src/menus/entities/menu.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';

@EntityRepository(Item)
export class ItemsRepository extends Repository<Item> {
  async createItem(
    menuId: number,
    createItemDto: CreateItemDto,
  ): Promise<Item> {
    const { name, size, price, isSold } = createItemDto;
    const menu = await this.findOne({ id: menuId });
    if (!menu) {
      throw new NotFoundException('no menu');
    }

    const item: Item = this.create({
      name,
      size,
      price,
      isSold,
      menu,
    });

    try {
      await this.save(item);
      return item;
    } catch (error) {}
    throw new InternalServerErrorException();
  }
}
