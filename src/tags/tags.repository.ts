import { Menu } from 'src/menus/entities/menu.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Tag)
export class TagsRepository extends Repository<Tag> {
    async createTag(createTagDto: CreateTagDto): Promise<Tag> {
        const { name, type } = createTagDto;

        const tag: Tag = this.create({
        name,
        type
        });

        try {
        await this.save(tag);
        return tag;
        } catch (error) {
        throw new InternalServerErrorException();
        }
    } 
} 