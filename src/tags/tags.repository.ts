import { EntityRepository, Repository } from 'typeorm';
import { Tag } from './entities/tag.entitiy';

@EntityRepository(Tag)
export class TagsRepository extends Repository<Tag> {}
