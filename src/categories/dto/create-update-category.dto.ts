import { IsString } from 'class-validator';

export class CreateUpdateCategoryDto {
  @IsString()
  name: string;
}
