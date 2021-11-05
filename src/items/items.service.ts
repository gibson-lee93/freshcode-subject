import { Injectable } from '@nestjs/common';
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
}
