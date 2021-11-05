import { CoreEntity } from '../../core/entities/core.entity';
import { Menu } from '../../menus/entities/menu.entity';
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
