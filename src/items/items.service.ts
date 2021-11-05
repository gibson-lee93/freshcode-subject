import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';
import { ItemsRepository } from './items.repository';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemsRepository)
    private itemsRepository: ItemsRepository,
  ) {}

  createItem(menuId: number, createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsRepository.createItem(menuId, createItemDto);
  }
}
