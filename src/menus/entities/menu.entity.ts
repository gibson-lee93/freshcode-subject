import { CoreEntity } from 'src/core/entities/core.entity';
import { Item } from 'src/items/entities/item.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Menu extends CoreEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  isSold: boolean;

  @Column()
  badge: string;

  @OneToMany((_type) => Item, (item) => item.menu, {
    eager: true,
    cascade: true,
  })
  items: Item[];

  @ManyToOne((_type) => Category, (category) => category.menus, {
    eager: true,
    onDelete: 'CASCADE',
  })
  category: Category;

  @ManyToMany((_type) => Tag, (tags) => tags.menus, { eager: true })
  tags: Tag[];

}
