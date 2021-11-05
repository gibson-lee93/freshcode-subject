import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name } = createCategoryDto;

    const category: Category = this.create({ name });

    try {
      await this.save(category);
      return category;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
