import { EntityRepository, Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

@EntityRepository(Tag)
export class TagsRepository extends Repository<Tag> {}
