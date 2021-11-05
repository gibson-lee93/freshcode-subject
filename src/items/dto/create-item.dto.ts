import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsString()
  size: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  isSold: boolean;
}
