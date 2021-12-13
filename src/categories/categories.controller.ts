import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth-guard/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateUpdateCategoryDto } from './dto/create-update-category.dto';
import { Category } from './entities/category.entity';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  createCategory(
    @Body() createUpdateCategoryDto: CreateUpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.createCategory(createUpdateCategoryDto);
  }

  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoriesService.getCategories();
  }

  @Get('/:id')
  getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.getCategoryById(Number(id));
  }

  @Patch('/:id')
  updateCategory(
    @Param('id') id: string,
    @Body() createUpdateCategoryDto: CreateUpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.updateCategory(
      Number(id),
      createUpdateCategoryDto,
    );
  }

  @Delete('/:id')
  deleteCategory(@Param('id') id: string): Promise<{ message: string }> {
    return this.categoriesService.deleteCategory(Number(id));
  }
}
