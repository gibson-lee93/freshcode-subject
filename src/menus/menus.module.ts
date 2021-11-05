import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { MenusRepository } from './menus.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([MenusRepository]), CategoriesModule],
  providers: [MenusService],
  controllers: [MenusController],
})
export class MenusModule {}
