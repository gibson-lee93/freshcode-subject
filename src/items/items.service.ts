import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from 'src/menus/entities/menu.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';
import { ItemsRepository } from './items.repository';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemsRepository)
    private itemsRepository: ItemsRepository,
  ) {}

  createItem(createItemDto: CreateItemDto, menu: Menu): Promise<Item> {
    return this.itemsRepository.createItem(createItemDto, menu);
  }

  async deleteItem(itemId: number): Promise<{ message: string }> {
    const item: Item = await this.itemsRepository.findOne(itemId);

    if (!item) {
      throw new NotFoundException('유효한 항목 id가 아닙니다.');
    }

    await this.itemsRepository.delete({ id: itemId });
    return { message: '메뉴 삭제 완료' };
  }
}
