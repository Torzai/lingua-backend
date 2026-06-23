import { IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateProgressDto {
  @IsString()
  vocabularyId!: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  dominio!: number;

  @IsNumber()
  @Min(0)
  repeticiones!: number;

  @IsNumber()
  @Min(0)
  correctas!: number;

  @IsNumber()
  @Min(0)
  incorrectas!: number;
}
