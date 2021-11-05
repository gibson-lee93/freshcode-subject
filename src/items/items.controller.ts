import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';
import { MenusService } from '../menus/menus.service';
import { UpdateItemDto } from './dto/update-item.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('items')
@UseGuards(AuthGuard())
export class ItemsController {
  constructor(
    private itemsService: ItemsService,
    private menusService: MenusService,
  ) {}

  @Post('/')
  async createItem(
    @Body() createItemDto: CreateItemDto,
    @GetUser() user: User,
  ): Promise<Item> {
    // 관리자 권한 인지 확인
    this.menusService.checkAdmin(user);
    // menuId로 menu 조회
    const menu = await this.menusService.getMenuById(createItemDto.menuId);

    return this.itemsService.createItem(createItemDto, menu);
  }

  @Delete('/:itemId')
  deleteItem(
    @Param('itemId') itemId: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    // 관리자 권한 인지 확인
    this.menusService.checkAdmin(user);

    return this.itemsService.deleteItem(itemId);
  }

  @Patch('/')
  async updateItem(
    @Body() updateItemDto: UpdateItemDto,
    @GetUser() user: User,
  ): Promise<Item> {
    // 관리자 권한 인지 확인
    this.menusService.checkAdmin(user);

    // menuId로 menu 조회
    await this.menusService.getMenuById(updateItemDto.menuId);

    return this.itemsService.updateItem(updateItemDto);
  }
}
