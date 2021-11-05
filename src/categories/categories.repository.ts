import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUpdateCategoryDto } from './dto/create-update-category.dto';
import { Category } from './entities/category.entity';

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {
  async createCategory(
    createUpdateCategoryDto: CreateUpdateCategoryDto,
  ): Promise<Category> {
    const { name } = createUpdateCategoryDto;

    const category: Category = this.create({ name });

    try {
      await this.save(category);
      return category;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
