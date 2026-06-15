import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';

@Injectable()
export class VocabularyService {
  constructor(private prisma: PrismaService) {}

  async create(createVocabularyDto: CreateVocabularyDto) {
    return await this.prisma.vocabulary.create({
      data: createVocabularyDto,
    });
  }

  async findAll(categoria?: string, nivel?: string, search?: string) {
    const where: any = {};

    if (categoria) {
      where.categoria = categoria;
    }

    if (nivel) {
      where.nivel = nivel;
    }

    if (search) {
      where.OR = [
        { palabraES: { contains: search, mode: 'insensitive' } },
        { palabraIT: { contains: search, mode: 'insensitive' } },
      ];
    }

    return await this.prisma.vocabulary.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return await this.prisma.vocabulary.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateVocabularyDto: CreateVocabularyDto) {
    return await this.prisma.vocabulary.update({
      where: { id },
      data: updateVocabularyDto,
    });
  }

  async delete(id: string) {
    return await this.prisma.vocabulary.delete({
      where: { id },
    });
  }

  async findRandom() {
    const count = await this.prisma.vocabulary.count();
    const skip = Math.floor(Math.random() * count);
    
    return await this.prisma.vocabulary.findFirst({
      skip,
    });
  }

  async getCategorias() {
    const result = await this.prisma.vocabulary.findMany({
      distinct: ['categoria'],
      select: { categoria: true },
    });

    return result.map((r) => r.categoria);
  }

  async getNiveles() {
    const result = await this.prisma.vocabulary.findMany({
      distinct: ['nivel'],
      select: { nivel: true },
    });

    return result.map((r) => r.nivel);
  }
}