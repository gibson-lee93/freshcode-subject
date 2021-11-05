import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post('/:menuId')
  createItem(
    @Param('menuId') menuId,
    @Body() createItemDto: CreateItemDto,
  ): Promise<Item> {
    return this.itemsService.createItem(menuId, createItemDto);
  }
}
