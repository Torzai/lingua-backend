import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async createOrUpdate(
    userId: string,
    vocabularyId: string,
    updateProgressDto: UpdateProgressDto,
  ) {
    const existingProgress = await this.prisma.progress.findUnique({
      where: {
        userId_vocabularyId: {
          userId,
          vocabularyId,
        },
      },
    });

    if (existingProgress) {
      return await this.prisma.progress.update({
        where: {
          userId_vocabularyId: {
            userId,
            vocabularyId,
          },
        },
        data: {
          ...updateProgressDto,
          ultimaPracticaFecha: new Date(),
        },
      });
    }

    return await this.prisma.progress.create({
      data: {
        userId,
        vocabularyId,
        ...updateProgressDto,
        ultimaPracticaFecha: new Date(),
      },
    });
  }

  async getUserProgress(userId: string) {
    return await this.prisma.progress.findMany({
      where: { userId },
      include: {
        vocabulario: {
          select: {
            id: true,
            palabraES: true,
            palabraIT: true,
            categoria: true,
            nivel: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getProgressByVocabulary(userId: string, vocabularyId: string) {
    const progress = await this.prisma.progress.findUnique({
      where: {
        userId_vocabularyId: {
          userId,
          vocabularyId,
        },
      },
      include: {
        vocabulario: true,
      },
    });

    if (!progress) {
      throw new NotFoundException('Progreso no encontrado');
    }

    return progress;
  }

  async recordPractice(
    userId: string,
    vocabularyId: string,
    isCorrect: boolean,
  ) {
    const progress = await this.prisma.progress.findUnique({
      where: {
        userId_vocabularyId: {
          userId,
          vocabularyId,
        },
      },
    });

    if (!progress) {
      return await this.prisma.progress.create({
        data: {
          userId,
          vocabularyId,
          repeticiones: 1,
          correctas: isCorrect ? 1 : 0,
          incorrectas: isCorrect ? 0 : 1,
          dominio: isCorrect ? 10 : 0,
          ultimaPracticaFecha: new Date(),
        },
      });
    }

    const newCorrectas = progress.correctas + (isCorrect ? 1 : 0);
    const newIncorrectas = progress.incorrectas + (isCorrect ? 0 : 1);
    const totalAttempts = newCorrectas + newIncorrectas;
    const newDominio = Math.round((newCorrectas / totalAttempts) * 100);

    return await this.prisma.progress.update({
      where: {
        userId_vocabularyId: {
          userId,
          vocabularyId,
        },
      },
      data: {
        repeticiones: progress.repeticiones + 1,
        correctas: newCorrectas,
        incorrectas: newIncorrectas,
        dominio: newDominio,
        ultimaPracticaFecha: new Date(),
      },
    });
  }

  async getStats(userId: string) {
    const progressList = await this.prisma.progress.findMany({
      where: { userId },
    });

    if (progressList.length === 0) {
      return {
        totalPalabras: 0,
        palabrasAprendidas: 0,
        tasaExito: 0,
        dominioPromedio: 0,
      };
    }

    const palabrasAprendidas = progressList.filter(
      (p) => p.dominio >= 80,
    ).length;
    const totalCorrectas = progressList.reduce(
      (acc, p) => acc + p.correctas,
      0,
    );
    const totalIncorrectas = progressList.reduce(
      (acc, p) => acc + p.incorrectas,
      0,
    );
    const tasaExito =
      totalCorrectas + totalIncorrectas > 0
        ? Math.round(
            (totalCorrectas / (totalCorrectas + totalIncorrectas)) * 100,
          )
        : 0;
    const dominioPromedio = Math.round(
      progressList.reduce((acc, p) => acc + p.dominio, 0) / progressList.length,
    );

    return {
      totalPalabras: progressList.length,
      palabrasAprendidas,
      tasaExito,
      dominioPromedio,
    };
  }
}
