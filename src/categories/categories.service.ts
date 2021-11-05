import { Injectable, NotFoundException } from '@nestjs/common';
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

  async deleteCategory(id: number): Promise<{ message: string }> {
    await this.getCategoryById(id);
    await this.categoriesRepository.delete({ id });
    return { message: '카테고리 삭제 완료' };
  }
}
