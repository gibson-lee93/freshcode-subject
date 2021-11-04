import { CoreEntity } from 'src/core/entities/core.entitiy';
import { Menu } from 'src/menus/entities/menu.entitiy';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Tag extends CoreEntity {
  @Column()
  type: string;

  @Column()
  name: string;

  @ManyToOne((_type) => Menu, (menu) => menu.tags, { eager: false })
  menu: Menu;
}
