import { EntityRepository, Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@EntityRepository(Item)
export class ItemsRepository extends Repository<Item> {}
