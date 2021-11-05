import { CoreEntity } from "src/core/entities/core.entity";
import { Entity, ManyToMany } from "typeorm";
import { Tag } from "./tag.entity";
import { Menu } from 'src/menus/entities/menu.entity';

@Entity()
export class Tag_Menu extends CoreEntity {


    @ManyToMany(()=>Menu)
    menu_id : Menu[]; 

    @ManyToMany(()=>Tag)
    tags_id : Tag[]; 

}     