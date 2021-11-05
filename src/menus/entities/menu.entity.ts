import { CoreEntity } from '../../core/entities/core.entity';
import { Item } from '../../items/entities/item.entity';
import { Tag } from '../../tags/entities/tag.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
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

  @OneToMany((_type) => Tag, (tag) => tag.menu, { eager: true })
  tags: Tag[];

  @ManyToOne((_type) => Category, (category) => category.menus, {
    eager: true,
    onDelete: 'CASCADE',
  })
  category: Category;
}
