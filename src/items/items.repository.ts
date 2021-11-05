import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';

@EntityRepository(Item)
export class ItemsRepository extends Repository<Item> {
  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const { name, size, price, isSold, menuId } = createItemDto;

    // 나중에 메뉴 에서 조회 기능 추가 하면 변경
    // const menu = await this.findOne({ id: menuId });
    // if (!menu) {
    //   throw new NotFoundException('no menu');
    // }

    const item: Item = this.create({
      name,
      size,
      price,
      isSold,
      // menu, 일단 에러가 나서 주석처리
    });

    try {
      await this.save(item);
      return item;
    } catch (error) {}
    throw new InternalServerErrorException();
  }
}
