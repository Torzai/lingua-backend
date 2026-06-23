import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

interface CustomRequest {
  user?: {
    userId: string;
    email: string;
  };
}

@Controller('progress')
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Get('me')
  @UseGuards(JwtGuard)
  async getMyProgress(@Request() req: CustomRequest) {
    return this.progressService.getUserProgress(req.user!.userId);
  }

  @Get('me/stats')
  @UseGuards(JwtGuard)
  async getMyStats(@Request() req: CustomRequest) {
    return this.progressService.getStats(req.user!.userId);
  }

  @Get('me/:vocabularyId')
  @UseGuards(JwtGuard)
  async getMyProgressByVocabulary(
    @Request() req: CustomRequest,
    @Param('vocabularyId') vocabularyId: string,
  ) {
    return this.progressService.getProgressByVocabulary(
      req.user!.userId,
      vocabularyId,
    );
  }

  @Post('me/:vocabularyId')
  @UseGuards(JwtGuard)
  async updateMyProgress(
    @Request() req: CustomRequest,
    @Param('vocabularyId') vocabularyId: string,
    @Body() updateProgressDto: UpdateProgressDto,
  ) {
    return this.progressService.createOrUpdate(
      req.user!.userId,
      vocabularyId,
      updateProgressDto,
    );
  }

  @Post('me/:vocabularyId/practice')
  @UseGuards(JwtGuard)
  async recordPractice(
    @Request() req: CustomRequest,
    @Param('vocabularyId') vocabularyId: string,
    @Body('isCorrect') isCorrect: boolean,
  ) {
    return this.progressService.recordPractice(
      req.user!.userId,
      vocabularyId,
      isCorrect,
    );
  }

  @Get(':userId')
  async getUserProgress(@Param('userId') userId: string) {
    return this.progressService.getUserProgress(userId);
  }

  @Get(':userId/stats')
  async getStats(@Param('userId') userId: string) {
    return this.progressService.getStats(userId);
  }
}
