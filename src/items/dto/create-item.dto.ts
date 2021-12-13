import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  isSold: boolean;

  @IsNumber()
  menuId: number;
}
