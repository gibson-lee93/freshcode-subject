import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { ItemsRepository } from './items.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenusModule } from '../menus/menus.module';

@Module({
  imports: [TypeOrmModule.forFeature([ItemsRepository]), MenusModule],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
