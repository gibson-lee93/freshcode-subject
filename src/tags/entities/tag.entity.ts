import { CoreEntity } from 'src/core/entities/core.entity';
import { Menu } from 'src/menus/entities/menu.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Tag extends CoreEntity {
  @Column()
  type: string;

  @Column()
  name: string;
  
  @ManyToMany((_type) => Menu, (menu) => menu.tags, {
    cascade: true,
  })
  @JoinTable({ name: 'tags_menus' })
  menus: Menu[];
  
}
