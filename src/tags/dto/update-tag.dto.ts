import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Menu } from 'src/menus/entities/menu.entity';

export class UpdateTagDto{

    @IsString()
    name : string;

    @IsString()
    type : string;
    
    @IsOptional()
    menu : Menu[]; 

}