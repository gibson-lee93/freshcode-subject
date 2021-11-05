import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { TagsRepository } from './tags.repository';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsRepository)
    private tagsRepository: TagsRepository,
  ) {}

  checkAdmin(user: User) {
    if (user.role === 'user') {
      throw new UnauthorizedException('관리자 권한입니다.');
    }
  }

  createTag(createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagsRepository.createTag(createTagDto);
  }

  async getTagAll(): Promise<Tag[]> {
    return this.tagsRepository.find();
  }

  async getTagById(id: number): Promise<Tag> {
    const findId = await this.tagsRepository.findOne({ id });
    if (!findId) {
      throw new NotFoundException('해당되는 태그가 없습니다.');
    }
    return findId;
  }

  async updateTag(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
    try {
      await this.tagsRepository.updateTag(updateTagDto, id);
      return await this.getTagById(id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteTag(id: number): Promise<{ message: string }> {
    await this.getTagById(id);
    try {
      await this.tagsRepository.delete({ id });
      return { message: '삭제가 완료되었습니다.' };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
