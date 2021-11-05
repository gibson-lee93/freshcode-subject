import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateUpdateCategoryDto } from './dto/create-update-category.dto';
import { Category } from './entities/category.entity';

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
}
