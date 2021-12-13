import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from '../menus/entities/menu.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
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

  async getItemById(id: number) {
    const item = await this.itemsRepository.findOne(id);
    if (!item) {
      throw new NotFoundException('해당 id의 item을 찾지 못하였습니다.');
    }
    return item;
  }

  async updateItem(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    try {
      await this.itemsRepository.update({ id }, updateItemDto);
      return await this.getItemById(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteItem(id: number): Promise<{ message: string }> {
    await this.getItemById(id);

    try {
      await this.itemsRepository.delete({ id });
      return { message: '항목 삭제 완료' };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
