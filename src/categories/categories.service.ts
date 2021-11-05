import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private categoriesRepository: CategoriesRepository,
  ) {}

  createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesRepository.createCategory(createCategoryDto);
  }

  async getCategories(): Promise<Category[]> {
    return await this.categoriesRepository.find({});
  }

  async getCategoryById(id: number): Promise<Category> {
    return await this.categoriesRepository.findOne({ id });
  }
}
