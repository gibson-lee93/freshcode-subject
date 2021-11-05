import { EntityRepository, Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { UpdateTagDto } from './dto/update-tag.dto';

@EntityRepository(Tag)
export class TagsRepository extends Repository<Tag> {
  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const { name, type } = createTagDto;

    const tag: Tag = this.create({
      name,
      type,
    });

    try {
      await this.save(tag);
      return tag;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateTag(updateTagDto: UpdateTagDto, id: number): Promise<void> {
    try {
      await this.update({ id }, updateTagDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
