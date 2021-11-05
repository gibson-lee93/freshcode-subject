import { IsString } from 'class-validator';

export class CreateTagMenuDto{

    @IsString()
    menu_id : string;

    @IsString()
    tag_id : string;

}