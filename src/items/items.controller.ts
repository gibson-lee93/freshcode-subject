import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';
import { MenusService } from 'src/menus/menus.service';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(
    private itemsService: ItemsService,
    private menusService: MenusService,
  ) {}

  @Post('/')
  async createItem(@Body() createItemDto: CreateItemDto): Promise<Item> {
    // menuId로 menu 조회
    const menu = await this.menusService.getMenuById(createItemDto.menuId);
    return this.itemsService.createItem(createItemDto, menu);
  }

  @Delete('/:itemId')
  deleteItem(@Param('itemId') itemId: number): Promise<{ message: string }> {
    return this.itemsService.deleteItem(itemId);
  }

  @Patch('/')
  async updateItem(@Body() updateItemDto: UpdateItemDto): Promise<Item> {
    // menuId로 menu 조회
    await this.menusService.getMenuById(updateItemDto.menuId);
    return this.itemsService.updateItem(updateItemDto);
  }
}
