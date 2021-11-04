import { CoreEntity } from 'src/core/entities/core.entity';
import { Menu } from 'src/menus/entities/menu.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Category extends CoreEntity {
  @Column()
  name: string;

  @ManyToOne((_type) => Menu, (menu) => menu.categories, { eager: false })
  menu: Menu;
}
