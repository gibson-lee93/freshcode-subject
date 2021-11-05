import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repository';
import { CreateUpdateCategoryDto } from './dto/create-update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private categoriesRepository: CategoriesRepository,
  ) {}

  createCategory(
    createUpdateCategoryDto: CreateUpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesRepository.createCategory(createUpdateCategoryDto);
  }

  async getCategories(): Promise<Category[]> {
    return await this.categoriesRepository.find({});
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoriesRepository.findOne({ id });
    if (!category) {
      throw new NotFoundException('유효한 카테고리 id가 아닙니다.');
    }
    return category;
  }

  async updateCategory(
    id: number,
    createUpdateCategoryDto: CreateUpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.getCategoryById(id);
    const { name } = createUpdateCategoryDto;
    category.name = name;
    try {
      return await this.categoriesRepository.save(category);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
