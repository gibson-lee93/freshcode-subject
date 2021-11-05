import { IsBoolean, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  isSold: boolean;

  @IsString()
  badge: string;
}
