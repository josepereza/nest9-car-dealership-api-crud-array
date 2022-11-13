import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCarDto {
  @IsOptional()
  @IsString()
  readonly id?: string;
  @IsOptional()
  @IsString()
  readonly brand?: string;
  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly model?: string;
}
