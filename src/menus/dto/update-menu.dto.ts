import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateMenuDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  isSold: boolean;

  @IsString()
  @IsOptional()
  badge: string;
}
