import { IsNumber, IsString, IsOptional } from 'class-validator';

export class SelectTagDto{

    @IsNumber()
    id : number;

    @IsString()
    name : string;

    @IsString()
    @IsOptional()
    type : string;
}