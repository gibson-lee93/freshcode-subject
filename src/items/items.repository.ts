import { EntityRepository, Repository } from 'typeorm';
import { Item } from './entities/item.entitiy';

@EntityRepository(Item)
export class ItemsRepository extends Repository<Item> {}
