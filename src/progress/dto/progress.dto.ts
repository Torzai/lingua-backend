export class ProgressDto {
  id?: string;
  userId?: string;
  vocabularyId?: string;
  repeticiones?: number;
  dominio?: number;
  correctas?: number;
  incorrectas?: number;
  ultimaPracticaFecha?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
