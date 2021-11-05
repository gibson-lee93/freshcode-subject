import { IsOptional, IsString } from "class-validator";


export class DeleteTagDto {


    @IsString()
    @IsOptional()
    type : string;

    @IsString()
    @IsOptional()
    name : string;

    
    
}