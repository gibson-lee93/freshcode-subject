import { EntityRepository, Repository } from 'typeorm';
import { Menu } from 'src/menus/entities/menu.entity';
@EntityRepository(Menu)
export class MenusRepository extends Repository<Menu> {}
