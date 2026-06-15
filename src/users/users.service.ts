import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        nombre: true,
        avatar: true,
        idiomaNativo: true,
        idiomaNivelES: true,
        idiomaNivelIT: true,
        puntos: true,
        premium: true,
        racha: true,
        totalDiasActivos: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        email: true,
        nombre: true,
        avatar: true,
        idiomaNativo: true,
        idiomaNivelES: true,
        idiomaNivelIT: true,
        puntos: true,
        premium: true,
        racha: true,
        totalDiasActivos: true,
      },
    });
  }

  async getStats(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        puntos: true,
        racha: true,
        totalDiasActivos: true,
        premium: true,
        progreso: {
          select: {
            dominio: true,
            repeticiones: true,
            correctas: true,
            incorrectas: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const totalPalabras = user.progreso.length;
    const palabrasAprendidas = user.progreso.filter(
      (p) => p.dominio >= 80,
    ).length;
    const tasaExito =
      user.progreso.length > 0
        ? Math.round(
            (user.progreso.reduce((acc, p) => acc + p.correctas, 0) /
              (user.progreso.reduce((acc, p) => acc + p.correctas + p.incorrectas, 0) || 1)) *
              100,
          )
        : 0;

    return {
      puntos: user.puntos,
      racha: user.racha,
      totalDiasActivos: user.totalDiasActivos,
      premium: user.premium,
      totalPalabras,
      palabrasAprendidas,
      tasaExito,
    };
  }
}