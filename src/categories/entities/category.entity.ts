import { CoreEntity } from 'src/core/entities/core.entity';
import { Menu } from 'src/menus/entities/menu.entity';
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
