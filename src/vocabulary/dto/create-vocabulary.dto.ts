import { IsString, IsOptional } from 'class-validator';

export class CreateVocabularyDto {
  @IsString()
  palabraES!: string;

  @IsString()
  palabraIT!: string;

  @IsString()
  categoria!: string;

  @IsString()
  nivel!: string;

  @IsString()
  ejemploES!: string;

  @IsString()
  ejemploIT!: string;

  @IsOptional()
  @IsString()
  imagen?: string;

  @IsOptional()
  @IsString()
  audioES?: string;

  @IsOptional()
  @IsString()
  audioIT?: string;
}