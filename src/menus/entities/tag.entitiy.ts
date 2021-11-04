import { CoreEntity } from 'src/core/entities/core.entitiy';
import { Menu } from 'src/menus/entities/menu.entitiy';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Category extends CoreEntity {
  @Column()
  name: string;

  @ManyToOne((_type) => Menu, (menu) => menu.categories, { eager: false })
  menu: Menu;
}
