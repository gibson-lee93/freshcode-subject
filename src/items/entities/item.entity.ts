import { CoreEntity } from 'src/core/entities/core.entity';
import { Menu } from 'src/menus/entities/menu.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Item extends CoreEntity {
  @Column()
  name: string;

  @Column()
  size: string;

  @Column()
  price: number;

  @Column()
  isSold: boolean;

  @ManyToOne((_type) => Menu, (menu) => menu.items, {
    eager: false,
    onDelete: 'CASCADE',
  })
  menu: Menu;
}
