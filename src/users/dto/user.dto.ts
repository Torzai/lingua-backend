export class UserDto {
  id?: string;
  email?: string;
  nombre?: string;
  avatar?: string;
  idiomaNativo?: string;
  idiomaNivelES?: number;
  idiomaNivelIT?: number;
  puntos?: number;
  premium?: boolean;
  racha?: number;
  totalDiasActivos?: number;
  createdAt?: Date;
}