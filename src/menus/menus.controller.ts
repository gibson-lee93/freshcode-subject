import { Body, Controller, Post } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menu } from './entities/menu.entity';
import { MenusService } from './menus.service';

@Controller('menus')
export class MenusController {
  constructor(private menusService: MenusService) {}

  @Post()
  createMenu(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
    return this.menusService.createMenu(createMenuDto);
  }
}
