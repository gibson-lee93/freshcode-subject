import { CoreEntity } from 'src/core/entities/core.entitiy';
import { Menu } from 'src/menus/entities/menu.entitiy';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Item extends CoreEntity {
  @Column()
  size: string;

  @Column()
  price: number;

  @Column()
  isSold: boolean;

  @ManyToOne((_type) => Menu, (menu) => menu.items, { eager: false })
  menu: Menu;
}
