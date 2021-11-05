import { CoreEntity } from '../../core/entities/core.entity';
import { Menu } from '../../menus/entities/menu.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Category extends CoreEntity {
  @Column()
  name: string;

  @OneToMany((_type) => Menu, (menu) => menu.category, {
    eager: false,
    cascade: true,
  })
  menus: Menu[];
}
