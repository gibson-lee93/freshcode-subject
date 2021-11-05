import { IsNumber } from 'class-validator';

export class RelationMenuTagDto {
  @IsNumber({},{ each: true })
  tags: number[];
}
