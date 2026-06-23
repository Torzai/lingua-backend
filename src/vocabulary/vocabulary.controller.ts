import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';

@Controller('vocabulary')
export class VocabularyController {
  constructor(private vocabularyService: VocabularyService) {}

  @Post()
  async create(@Body() createVocabularyDto: CreateVocabularyDto) {
    return this.vocabularyService.create(createVocabularyDto);
  }

  @Get()
  async findAll(
    @Query('categoria') categoria?: string,
    @Query('nivel') nivel?: string,
    @Query('search') search?: string,
  ) {
    return this.vocabularyService.findAll(categoria, nivel, search);
  }

  @Get('random')
  async findRandom() {
    return this.vocabularyService.findRandom();
  }

  @Get('categorias')
  async getCategorias() {
    return this.vocabularyService.getCategorias();
  }

  @Get('niveles')
  async getNiveles() {
    return this.vocabularyService.getNiveles();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.vocabularyService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVocabularyDto: CreateVocabularyDto,
  ) {
    return this.vocabularyService.update(id, updateVocabularyDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.vocabularyService.delete(id);
  }
}
