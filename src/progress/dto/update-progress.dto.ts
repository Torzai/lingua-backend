import { IsNumber, IsOptional, Min, Max } from 'class-validator';

export class UpdateProgressDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  dominio?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  repeticiones?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  correctas?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  incorrectas?: number;
}
