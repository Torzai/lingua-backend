import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

interface CustomRequest {
  user?: {
    userId: string;
    email: string;
  };
}

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtGuard)
  async getMe(@Request() req: CustomRequest) {
    return this.usersService.findById(req.user!.userId);
  }

  @Get('me/stats')
  @UseGuards(JwtGuard)
  async getMyStats(@Request() req: CustomRequest) {
    return this.usersService.getStats(req.user!.userId);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get(':id/stats')
  async getStats(@Param('id') id: string) {
    return this.usersService.getStats(id);
  }

  @Put('me')
  @UseGuards(JwtGuard)
  async updateMe(@Request() req: CustomRequest, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user!.userId, updateUserDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}