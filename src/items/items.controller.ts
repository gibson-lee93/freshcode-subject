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
import { User } from '../users/entities/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { JwtAuthGuard } from '../auth/auth-guard/jwt-auth.guard';

@Controller('items')
@UseGuards(JwtAuthGuard)
export class ItemsController {
  constructor(
    private itemsService: ItemsService,
    private menusService: MenusService,
  ) {}

  @Post()
  async createItem(
    @Body() createItemDto: CreateItemDto,
    @GetUser() user: User,
  ): Promise<Item> {
    // 관리자 권한 인지 확인
    this.menusService.checkAdmin(user.role);
    // menuId로 menu 조회
    const menu = await this.menusService.getMenuById(createItemDto.menuId);
    return this.itemsService.createItem(createItemDto, menu);
  }

  @Patch('/:itemId')
  async updateItem(
    @Param('itemId') itemId: string,
    @Body() updateItemDto: UpdateItemDto,
    @GetUser() user: User,
  ): Promise<Item> {
    // 관리자 권한 인지 확인
    this.menusService.checkAdmin(user.role);
    return this.itemsService.updateItem(Number(itemId), updateItemDto);
  }

  @Delete('/:itemId')
  deleteItem(
    @Param('itemId') itemId: string,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    // 관리자 권한 인지 확인
    this.menusService.checkAdmin(user.role);
    return this.itemsService.deleteItem(Number(itemId));
  }
}
